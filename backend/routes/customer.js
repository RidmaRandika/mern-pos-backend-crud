const router = require('express').Router();
const customerController = require('../controllers/customerController');


router
      .route('/')
      .post(customerController.createCustomer)
      .get(customerController.getAllCustomers);


router
      .route('/:id')
      .get(customerController.getCustomer)
      .patch(customerController.updateCustomer)
      .delete(customerController.deleteCustomer);


module.exports = router;