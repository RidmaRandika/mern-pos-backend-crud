const Item = require("../models/item.model");

exports.createItem = async (req, res) => {
    const { descriprion, unitPrice, qtyOnHand } = req.body;
    const item = new Item ({ descriprion, unitPrice, qtyOnHand });
    await item.save()
      .then(() => res.json('Item Added Successfully!'))
      .catch((err) => {res.status(500).json('Error :' + err)});
}

exports.getAllItems = async (req, res) => {
    await Item.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json('Error :' + err));
}

exports.getItem = async (req, res) => {
    await Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json('Error :' + err));
}

exports.deleteItem = async (req, res) => {
    await Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted !'))
    .catch((err) => res.status(400).json('Error : ' + err));
}

exports.updateItem = async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .then(() => res.json("Item Updated Successfully!"))
      .catch((err) => res.status(500).json("Error :" + err));
}