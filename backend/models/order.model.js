const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderDate: {
      type: Date,
      required: true,
    },
    cusid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    odid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetails',
        required: true
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
