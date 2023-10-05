const { isValidObjectId } = require("mongoose");
const RestaurantTables = require("../../../models/Restaurant.tables");

const addTable = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    if (!name || !capacity) {
      return res
        .status(400)
        .json({ msg: "Both the name and capacity is required." });
    }
    const newTable = await new RestaurantTables({
      name,
      capacity,
    });
    await newTable.save();
    return res.status(200).json({ msg: "Table added successfully." });
  } catch (err) {
    return res.status(500).json({ msg: "An unknown error occoured." });
  }
};

const getTables = async (req, res) => {
  try {
    const tables = await RestaurantTables.find({});
    if (!tables.length >= 1) {
      return res.status(400).json({ msg: "There are no tables found." });
    }
    return res.status(200).json({ tables });
  } catch (err) {
    return res.status(500).json({ msg: "There was an unknown server error." });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ msg: "Table ID is required." });
    }
    const isValid = await isValidObjectId(_id);
    if (!isValid) {
      return res.status(400).json({ msg: "Please provide a valid table ID" });
    }
    const deletedTable = await RestaurantTables.findOneAndDelete({ _id });
    if (!deletedTable) {
      return res
        .status(404)
        .json({ msg: "The table to delete was not found." });
    }
    return res.status(200).json({ msg: "Table deleted successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "There was an unknown error while deleting table." });
  }
};

const editTable = async (req, res) => {
  try {
    const { _id, name, capacity } = req.body;
    const isValid = isValidObjectId(_id);
    if (!isValid) {
      return res.status(400).json({ msg: "Please provide a valid table ID" });
    }
    const updatedTable = await RestaurantTables.findOneAndUpdate(
      { _id },
      {
        name,
        capacity,
      }
    );
    if (!updatedTable) {
      return res
        .status(404)
        .json({ msg: "The requested table to edit was not found." });
    }
    return res.status(200).json({ msg: "the table was edited successfully." });
  } catch {
    return res.status(500).json({
      msg: "Unknown server error while updating the table information.",
    });
  }
};

module.exports = { getTables, addTable, editTable, deleteTable };
