const mongoose = require('mongoose');
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour'
  },
  date: String,
  adults: Number,
  children: Number,
  totalPrice: Number
});

orderSchema.pre('save', async function(next) {
  const tour = await Tour.findById(this.tour);

  if (!tour) next(new AppError('Taka wycieczka nie istnieje', 404));

  const people = this.adults + this.children;
  this.totalPrice = people * tour.price;

  this.date = tour.startDate;

  const { limit } = tour;
  if (limit < people)
    return next(new AppError('Brak miejsc na tą wycieczkę!', 404));

  await Tour.findByIdAndUpdate(tour.id, { $inc: { limit: -people } });

  next();
});

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'country gallery'
  });

  this.populate({
    path: 'user',
    select: 'name'
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
