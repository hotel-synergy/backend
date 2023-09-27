const mongoose = require("mongoose");
const restaurantMenuCategory = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model(
  "RESTAURANT_menu_category",
  restaurantMenuCategory,
  "RESTAURANT_menu_category"
);
