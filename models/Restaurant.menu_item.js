const mongoose = require("mongoose");
const restaurantMenuitem = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
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
  "RESTAURANT_menu_item",
  restaurantMenuitem,
  "RESTAURANT_menu_item"
);
