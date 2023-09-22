const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/v1/admin');
const authRouter = require('./routes/v1/auth');
const checkConfig = require('./controllers/v1/middlewares/findConfig');
const setupRouter = require('./routes/v1/setup');
const app = express();
require('dotenv').config();

const customHeaders = (req, res,next) => {
  app.disable('x-powered-by');
  res.setHeader('X-powered-by', "Hotel Synergy");
  next();
}

//connect to db first
mongoose.connect(process.env.DB_URI).then(() => {
    console.log('DB Connected successfully.');
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Application started and listening on port ${process.env.SERVER_PORT}`);
    })
});

//middlewares
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', "http://127.0.0.1:5173"]
}));
app.use(customHeaders);
app.use(express.json());
app.use(cookieParser());

//API v1 endpoints.
app.use('/v1/setup', setupRouter);
app.use('/v1/auth',checkConfig, authRouter);
app.use('/v1/admin', checkConfig, adminRouter);



//for the index page.
app.get('/', async (req, res) => {
  const acceptHeader = req.get('Accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    res.sendFile(__dirname + '/public/about.html');
  } else {
    return res.status(200).json({
      name: 'Hotel-Synergy Backend',
      author: 'Hari Acharya',
      project: 'https://www.hotel-synergy.net/',
      authorGithub: 'https://www.github.com/hariacharya80',
      projectGithub: 'https://www.github.com/hotel-synergy/backend',
    });
  }
});

//for the favicon.. TODO: I will convert that png to ico for better compatibility
app.get('/favicon.ico', async (req, res) => {
  res.sendFile(__dirname + "/public/favicon.png");
})

//for 404 not found page.
app.use('*', async (req, res) => {
  const acceptHeader = req.get('Accept');
  if (acceptHeader && acceptHeader.includes('text/html')) {
    res.status(404).sendFile(__dirname + '/public/notfound.html');
  } else {
    return res.status(404).json({
      error: true,
      message: 'The requested resource was not found or is moved to the new address'
    });
  }
});