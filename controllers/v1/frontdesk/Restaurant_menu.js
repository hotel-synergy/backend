// TODO:MUST IMPLEMENT THE FEATURE OF IMAGES.

const RestaurantMenu_category = require("../../../models/Restaurant.menu_category");
const RestaurantMenu_item = require("../../../models/Restaurant.menu_item");

const getAllMenu = async (req, res) => {
  try {
    const menuList = await RestaurantMenu_item.find({});
    if (menuList.length === 0) {
      return res.status(404).json({ msg: "No menu items were found." });
    }
    return res.status(200).json({ menu: menuList });
  } catch (err) {
    return res.status(500).json({
      msg: "An unknown internal error occoured, please try again later.",
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ msg: "Menu Id is missing." });
    }
    const deleteMenu = await RestaurantMenu_item.findOneAndDelete({ _id });
    if (!deleteMenu) {
      return res
        .status(404)
        .json({ msg: "That menu was not found to delete." });
    }
    return res.status(200).json({ msg: "Menu item deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "There was an unknown server error please try again later.",
    });
  }
};

const addMenu = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category || !description) {
      return res
        .status(400)
        .json({ msg: "All information about the menu is required." });
    }

    const find_category = await RestaurantMenu_category.findOne({
      _id: category,
    });
    if (!find_category) {
      return res.status(404).json({ msg: "That category was not found." });
    }

    const newMenu = await new RestaurantMenu_item({
      name,
      image: "demo",
      price: Number(price),
      category,
      description,
    });

    await newMenu.save();

    return res.status(200).json({ msg: "Menu added successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "There was an unknown error adding new menu" });
  }
};

const updateMenu = async (req, res) => {
  const { _id, name, price, category, description } = req.body;
  if (!_id || !name || !price || !category || !description) {
    return res.status(400).json({ msg: "All information are required." });
  }
  const menuItem = await RestaurantMenu_item.findOne({ _id });
  if (!menuItem) {
    return res.status(404).json({ msg: "That menu item was not found." });
  }
  const existingCategory = await RestaurantMenu_category.findOne({
    _id: category,
  });
  if (!existingCategory) {
    return res.status(400).json({ msg: "The new category is invalid." });
  }
  const updatedItem = await RestaurantMenu_item.findOneAndUpdate(
    {
      _id,
    },
    {
      name,
      price,
      category,
      image: "demo",
      description,
    }
  );
  return res.status(200).json({ msg: "The menu item updated successfully." });
};

module.exports = {
  getAllMenu,
  deleteMenu,
  addMenu,
  updateMenu,
};
