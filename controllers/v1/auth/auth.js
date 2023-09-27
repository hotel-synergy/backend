const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../../models/Company.users");
const validateEmail = require("../../../utils/validateEmail");
const { SendPasswordResetEmail } = require("../../../utils/sendemail");
const parseJwt = require("../../../utils/parseJwt");
require("dotenv").config();

const loginUser = async (req, res) => {
  //extract the user input.
  const { email, password } = req.body;

  //check if they exists
  if (!email || !password) {
    return res.status(400).json({ msg: "All information are required." });
  }

  //validate user ID
  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ msg: "The email provided is invalid." });
  }

  //get user from DB
  const userInDB = await User.findOne({ email });
  if (!userInDB) {
    //user was not found on DB.
    return res.status(404).json({ msg: "That user was not found" });
  }

  //compare password.
  const passwordMatched = await bcrypt.compare(password, userInDB.password);
  if (!passwordMatched) {
    //Password did not matched.
    return res
      .status(400)
      .json({ msg: "Wrong password, please try again later." });
  }

  if (!userInDB.verified) {
    return res
      .status(400)
      .json({ msg: "Please verify your email before login." });
  }

  //generate a login token valid for 1 hour.
  const token = jwt.sign(
    { user: userInDB.fullName, role: userInDB.role },
    process.env.JWT_SECRET.toString(),
    {
      algorithm: "HS256",
    }
  );

  //set the token in response header.
  res.cookie("hs_auth", token, {
    secure: process.env.DEPLOYMENT === "production" ? true : false,
    httpOnly: false,
    maxAge: 3600000,
  });

  //return a successful response with user details.
  return res.status(200).json({
    msg: "Login successful.",
    user: {
      name: userInDB.fullName,
      username: userInDB.username,
      picture: userInDB.image,
      role: userInDB.role,
    },
  });
};

const resetUserPassword = async (req, res) => {
  //reset a user password.
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Email address is required." });
  }

  //check if the provided email is valid.
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    return res
      .status(400)
      .json({ msg: "Please provide a valid email address." });
  }

  //find user with given email.
  const userInDB = await User.findOne({ email });
  if (!userInDB) {
    return res
      .status(404)
      .json({ msg: "That user was not found in the database." });
  }

  //generate a new token for password reset.
  const linkToken = await jwt.sign(
    { _id: userInDB._id },
    process.env.JWT_SECRET.toString(),
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );

  //set the token in db
  const updateUser = await User.findOneAndUpdate(
    { _id: userInDB._id },
    {
      tokenMailed: linkToken,
    }
  );

  //sending a new email with password reset link
  const isMailSent = await SendPasswordResetEmail(
    linkToken,
    userInDB.email,
    userInDB.fullName
  );
  if (!isMailSent) {
    console.log(isMailSent);
    return res.status(500).json({
      msg: "There was an error sending email to your inbox, please contact admin",
    });
  }

  return res
    .status(200)
    .json({ msg: "Password reset email sent successfully." });
};

const setNewPasswordAfterReset = async (req, res) => {
  //get token from body
  const { token, newPassword } = req.body;
  if (!token) {
    return res.status(401).json({ msg: "Token is missing." });
  }

  //see if the token is valid.
  const isValidToken = await jwt.verify(
    token,
    process.env.JWT_SECRET.toString(),
    {
      algorithms: "HS256",
    }
  );
  if (!isValidToken) {
    return res.status(401).json({ msg: "The provided token is not valid." });
  }

  //get token data
  const jwtData = await parseJwt(token);
  const _id = jwtData._id;

  const userInDb = await User.findOne({ _id });
  if (token !== userInDb.tokenMailed) {
    return res
      .status(401)
      .json({ msg: "That token is expired or no longer avilable." });
  }

  //hash the new pasword
  const hashedPassword = await bcrypt.hash(
    newPassword,
    parseInt(process.env.BCRYPT_SALT)
  );

  //find the user and update the password
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    {
      password: hashedPassword,
      tokenMailed: "none",
    }
  );

  if (!updatedUser) {
    return res.status(404).json({ msg: "That user was not found." });
  }

  return res.status(200).json({ msg: "Password updated successfully." });
};

const verifyUserEmailAddress = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ msg: "Not a valid verification link." });
  }

  // HOW TO SEE IF THE TOKEN IS VALID?
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET.toString(), {
      algorithms: "HS256",
    });
    const userInDb = await User.findOne({ _id: decoded._id });
    if (!userInDb) {
      return res.status(404).json({ msg: "User for that token is not found." });
    }
    if (userInDb.tokenMailed !== token) {
      return res.status(400).json({ msg: "The provided token is not valid." });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userInDb._id },
      {
        verified: true,
        tokenMailed: "none",
      }
    );

    return res
      .status(200)
      .json({ msg: "The email address was verified successfully." });
  } catch (err) {
    return res.status(400).json({ msg: "Invalid verification token." });
  }
};

module.exports = {
  loginUser,
  resetUserPassword,
  setNewPasswordAfterReset,
  verifyUserEmailAddress,
};
