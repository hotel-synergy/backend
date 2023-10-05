const mongoose = require("mongoose");

const restaurantTables = mongoose.Schema({
  name: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  free: {
    default: false,
    type: Boolean,
  },
  fromHotel: {
    default: false,
    type: Boolean,
  },
  fromHotelRoom: {
    type: String,
  },
});

module.exports = mongoose.model(
  "RESTAURANT_tables",
  restaurantTables,
  "RESTAURANT_tables"
);
