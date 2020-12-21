const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/add-review/:id', viewsController.addReview);
router.get('/', viewsController.getLandingPage);
router.get('/overview', viewsController.getOverview);
router.get('/winter', viewsController.getWinter);
router.get('/summer', viewsController.getSummer);
router.get('/exotic', viewsController.getExotic);
router.get('/country-tours', viewsController.getCountryTours);
router.get('/my-account', viewsController.getProfile);
router.get('/tour/:slug', viewsController.getTour);

router.get(
  '/add-tour',
  authController.restrictTo('admin'),
  viewsController.addTour
);
router.get(
  '/edit-tour/:id',
  authController.restrictTo('admin'),
  viewsController.editTour
);
router.get(
  '/tours',
  authController.restrictTo('admin'),
  viewsController.getTours
);
router.get(
  '/user/:id',
  authController.restrictTo('admin'),
  viewsController.getUser
);
router.get(
  '/users',
  authController.restrictTo('admin'),
  viewsController.getUsers
);
router.get(
  '/orders',
  authController.restrictTo('admin'),
  viewsController.getOrders
);

module.exports = router;
