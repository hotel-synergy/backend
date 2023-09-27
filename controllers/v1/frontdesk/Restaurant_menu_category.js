const RestaurantMenu_category = require("../../../models/Restaurant.menu_category");

const getAllMenuCategory = async (req, res) => {
  try {
    const categoryList = await RestaurantMenu_category.find({});
    if (categoryList.length === 0) {
      return res
        .status(404)
        .json({ msg: "No categories were found in the system." });
    }
    return res.status(200).json({ list: categoryList });
  } catch (error) {
    return res.status(500).json({
      msg: "There was an inernal error when loading category list, please try again later.",
    });
  }
};

const deleteMenuCategory = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ msg: "The category ID to delete is required." });
    }
    const deletedItem = await RestaurantMenu_category.findOneAndDelete({
      _id,
    });
    if (!deletedItem) {
      return res
        .status(404)
        .json({ msg: "That item was not found to delete." });
    }
    return res.status(200).json({ msg: "Category deleted successfully." });
  } catch (err) {
    return res.status(500).json({ msg: "There was an internal server error." });
  }
};

const addMenuCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newCategory = await new RestaurantMenu_category({
      name,
      description,
      image: "to build",
    });
    await newCategory.save();
    return res.status(200).json({ msg: "New Category added successfully." });
  } catch (err) {
    return res.status(500).json({ msg: "There was an unknown server error." });
  }
};

const updateMenuCategory = async (req, res) => {
  try {
    const { _id, name, description } = req.body;
    if (!_id || !name || !description) {
      return res.status(400).json({ msg: "All information is required." });
    }
    const updatedDocument = await RestaurantMenu_category.findOneAndUpdate(
      {
        _id,
      },
      {
        name,
        description,
      }
    );
    return res.status(200).json({ msg: "The category has been updated." });
  } catch (err) {
    return res.status(500).json({ msg: "There was an unknown server error." });
  }
};

module.exports = {
  getAllMenuCategory,
  deleteMenuCategory,
  addMenuCategory,
  updateMenuCategory,
};
