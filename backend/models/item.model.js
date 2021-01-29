const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    descriprion: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    qtyOnHand: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
