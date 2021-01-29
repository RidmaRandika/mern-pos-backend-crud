const router = require('express').Router();
const orderDetailsController = require('../controllers/orderDetailsController');


router
      .route('/')
      .post(orderDetailsController.createOrderDetail)
      .get(orderDetailsController.getAllOrderDetails);


router
      .route('/:id')
      .get(orderDetailsController.getOrderDetail)
      .patch(orderDetailsController.updateOrderDetail)
      .delete(orderDetailsController.deleteOrderDetail);


module.exports = router;