const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:tourId/:quant',
  orderController.getCheckoutSession
);

router
  .route('/')
  .get(authController.restrictTo('admin'), orderController.getAllOrders)
  .post(userController.setUserId, orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(authController.restrictTo('admin'), orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
