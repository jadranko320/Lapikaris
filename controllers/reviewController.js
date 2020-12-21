const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.likeReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.body.id);

  let { rating } = review;
  rating = rating * 1 + 1;

  const updatedReview = await Review.findByIdAndUpdate(
    req.body.id,
    { rating: rating },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: 'success',
    data: {
      data: updatedReview
    }
  });
});

exports.dislikeReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.body.id);

  let { rating } = review;
  rating = rating * 1 - 1;

  const updatedReview = await Review.findByIdAndUpdate(
    req.body.id,
    { rating: rating },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: 'success',
    data: {
      data: updatedReview
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const isAdded = await Review.find({
    $and: [{ tour: req.body.tour }, { user: res.locals.user.id }]
  });

  if (isAdded.length > 0)
    return next(new AppError('Już dodałeś recenzję do tej wycieczki!', 404));

  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: review
    }
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
