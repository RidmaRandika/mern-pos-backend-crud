const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema(
  {
    iid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required : true
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderDetail  = mongoose.model('OrderDetail',orderDetailSchema);
module.exports = OrderDetail;