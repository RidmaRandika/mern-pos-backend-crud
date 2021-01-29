const router = require('express').Router();
const itemController = require('../controllers/itemController');


router
      .route('/')
      .post(itemController.createItem)
      .get(itemController.getAllItems);


router
      .route('/:id')
      .get(itemController.getItem)
      .patch(itemController.updateItem)
      .delete(itemController.deleteItem);


module.exports = router;