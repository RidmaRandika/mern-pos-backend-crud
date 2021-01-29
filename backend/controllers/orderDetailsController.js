const OrderDetail = require("../models/orderdetail.model");

exports.createOrderDetail = async (req, res) => {
  const { iid, unitPrice, qty, amount } = req.body;
  const orderDetail = new OrderDetail({ iid, unitPrice, qty, amount });

  try {
    const newOrder = await orderDetail.save();
          
     res.status(201).json({
      status: "success",
      data: {
        newOrder
      },
    });

  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAllOrderDetails = async (req, res) => {
  await OrderDetail.find()
    .then((orderdetails) => res.json(orderdetails))
    .catch((err) => res.status(400).json("Error :" + err));
};

exports.getOrderDetail = async (req, res) => {
  await OrderDetail.findById(req.params.id)
    .then((orderdetails) => res.json(orderdetails))
    .catch((err) => res.status(500).json("Error :" + err));
};

exports.deleteOrderDetail = async (req, res) => {
  await OrderDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted !"))
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.updateOrderDetail = async (req, res) => {
  await OrderDetail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => res.json("Order Details Updated Successfully!"))
    .catch((err) => res.status(500).json("Error :" + err));
};
