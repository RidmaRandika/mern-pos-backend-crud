const Customer = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
  const { name, address, salary } = req.body;
  const customer = new Customer({ name, address, salary });
  await customer
    .save()
    .then(() => res.json("Customer Added !"))
    .catch((err) => {
      res.status(500).json("Error :" + err);
    });
};

exports.getAllCustomers = async (req, res) => {
  await Customer.find()
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error :" + err));
};

exports.getCustomer = async (req, res) => {
  await Customer.findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(500).json("Error :" + err));
};

exports.deleteCustomer = async (req, res) => {
  console.log(req.params.id);
  await Customer.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer Deleted !"))
    .catch((err) => res.status(400).json("Error : " + err));
};

exports.updateCustomer = async (req, res) => {
  await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => res.json("Customer Updated Successfully!"))
    .catch((err) => res.status(500).json("Error :" + err));
};
