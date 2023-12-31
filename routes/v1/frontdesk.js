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

const {
  getTables,
  addTable,
  editTable,
  deleteTable,
} = require("../../controllers/v1/frontdesk/Restaurant_tables");
const frontdeskRouter = express.Router();

frontdeskRouter.get("/menu", getAllMenu);
frontdeskRouter.delete("/menu", deleteMenu);
frontdeskRouter.post("/menu", addMenu);
frontdeskRouter.put("/menu", updateMenu);

frontdeskRouter.get("/menu/category", getAllMenuCategory);
frontdeskRouter.delete("/menu/category", deleteMenuCategory);
frontdeskRouter.post("/menu/category", addMenuCategory);
frontdeskRouter.put("/menu/category", updateMenuCategory);

frontdeskRouter.get("/table", getTables);
frontdeskRouter.post("/table", addTable);
frontdeskRouter.put("/table", editTable);
frontdeskRouter.delete("/table", deleteTable);

module.exports = frontdeskRouter;
