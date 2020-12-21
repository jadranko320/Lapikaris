const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authController.protect);

router.patch('/likeReview', reviewController.likeReview);
router.patch('/dislikeReview', reviewController.dislikeReview);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(userController.setUserId, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('admin'), reviewController.updateReview)
  .delete(authController.restrictTo('admin'), reviewController.deleteReview);

module.exports = router;
