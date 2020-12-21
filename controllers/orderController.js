const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Order = require('../models/orderModel');
const Tour = require('./../models/tourModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/index`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.countrySlug}`,
    customer_email: req.user.email, //?
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.country}`,
        images: [`${tour.gallery[0]}`],
        amount: tour.price * 100,
        currency: 'pln',
        quantity: req.params.quant
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    session
  });
});

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
