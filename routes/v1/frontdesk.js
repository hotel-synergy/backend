const express = require("express");
const {
  getAllMenu,
  deleteMenu,
  addMenu,
  updateMenu,
} = require("../../controllers/v1/frontdesk/Restaurant_menu");
const {
  deleteMenuCategory,
  addMenuCategory,
  updateMenuCategory,
  getAllMenuCategory,
} = require("../../controllers/v1/frontdesk/Restaurant_menu_category");
const frontdeskRouter = express.Router();

frontdeskRouter.get("/menu", getAllMenu);
frontdeskRouter.delete("/menu", deleteMenu);
frontdeskRouter.post("/menu", addMenu);
frontdeskRouter.put("/menu", updateMenu);

frontdeskRouter.get("/menu/category", getAllMenuCategory);
frontdeskRouter.delete("/menu/category", deleteMenuCategory);
frontdeskRouter.post("/menu/category", addMenuCategory);
frontdeskRouter.put("/menu/category", updateMenuCategory);

module.exports = frontdeskRouter;
