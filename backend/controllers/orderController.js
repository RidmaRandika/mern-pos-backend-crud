const mongoose = require("mongoose");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderdetail.model");
const Item = require("../models/item.model");

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { iid, unitPrice, qty, amount, orderDate, cusid } = req.body;
  let qtyOnHand = 0;
  const orderDetail = new OrderDetail({ iid, unitPrice, qty, amount });
  try {
    const detail = await orderDetail.save();
    if (detail) {
      const odid = detail._id;
      const order = new Order({ orderDate, cusid, odid });
      const ord = await order.save();
      if (ord) {
        await Item.findById(iid).then((item) => {
          qtyOnHand = item.qtyOnHand;
        });
        let item = null;
        await Item.findByIdAndUpdate(
          iid,
          {
            qtyOnHand: qtyOnHand - qty,
          },
          {
            new: true,
            runValidators: true,
          }
        ).then((itm) => {
          item = itm;
        });
        await session.commitTransaction();
        res.status(200).json({
          status: "success",
          data: {
            detail,
            item,
            ord,
          },
        });
      }
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  await Order.find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error :" + err));
};

exports.getOrder = async (req, res) => {
  await Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json("Error :" + err));
};

exports.deleteOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Order.findById(req.params.id).then(async (order) => {
      const val = await OrderDetail.findByIdAndDelete(order.odid);
      if (val) {
        await Order.findByIdAndDelete(req.params.id);
        await session.commitTransaction();
      }
    });
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { iid, unitPrice, qty, amount, orderDate, cusid } = req.body;

  const orderDetail = new OrderDetail({ iid, unitPrice, qty, amount });
  const item = (ord = null);
  try {
    await Order.findById(req.params.id).then(async (order) => {
      const detail = await OrderDetail.findByIdAndUpdate(
        order.odid,
        orderDetail,
        {
          new: true,
          runValidators: true,
        }
      );
      if (detail) {
        item = await Item.findByIdAndUpdate(
          iid,
          {
            qtyOnHand: qtyOnHand - qty,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (it) {
          const odid = order.odid;
          const odd = new Order({ orderDate, cusid, odid });
          ord = await Order.findByIdAndUpdate(req, params.id, odd, {
            new: true,
            runValidators: true,
          }).then(async () => {
            await session.commitTransaction();
          });
        }
      }
    });

    res.status(200).json({
      status: "success",
      data: {
        detail,
        item,
        ord,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
