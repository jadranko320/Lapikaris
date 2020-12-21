const Tour = require('./../models/tourModel');
const Review = require('./../models/reviewModel');
const User = require('./../models/userModel');
const Order = require('./../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.addTour = catchAsync(async (req, res, next) => {
  res.status(200).render('add-tour', {
    title: 'Dodaj wycieczkę'
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) next(new AppError('Brak tej wycieczki w bazie danych', 404));

  res.status(200).render('add-review', {
    title: 'Dodaj recencję',
    tour
  });
});

exports.editTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) next(new AppError('Brak tej wycieczki w bazie danych', 404));

  res.status(200).render('edit-tour', {
    title: 'Edytuj wycieczkę',
    tour
  });
});

exports.getLandingPage = catchAsync(async (req, res, next) => {
  const tours = await Tour.find({ limit: { $gt: 0 } }).limit(8);

  res.status(200).render('landing', {
    title: 'Spełniaj marzenia',
    tours
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Order.find(), req.query).filter().paginate();
  const orders = await features.query;

  const sum = await Order.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('orders', {
    title: 'Zamówienia',
    orders,
    sum
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find({ limit: { $gt: 0 } }), req.query)
    .filter()
    .paginate();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('overview', {
    title: 'Wycieczki',
    tours,
    sum
  });
});

exports.getExotic = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Tour.find({ $and: [{ category: 'exotic' }, { limit: { $gt: 0 } }] }),
    req.query
  )
    .filter()
    .paginate();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('exotic', {
    title: 'Wycieczki egzotyczne',
    tours,
    sum
  });
});

exports.getCountryTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Tour.find({ $and: [{ category: 'tour' }, { limit: { $gt: 0 } }] }),
    req.query
  )
    .filter()
    .paginate();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('country-tours', {
    title: 'Wycieczki krajoznawcze',
    tours,
    sum
  });
});

exports.getSummer = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Tour.find({ $and: [{ category: 'summer' }, { limit: { $gt: 0 } }] }),
    req.query
  )
    .filter()
    .paginate();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('summer', {
    title: 'Wkacje / Lato',
    tours,
    sum
  });
});

exports.getWinter = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Tour.find({ $and: [{ category: 'winter' }, { limit: { $gt: 0 } }] }),
    req.query
  )
    .filter()
    .paginate();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('winter', {
    title: 'Ferie zimowe',
    tours,
    sum
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: res.locals.user.id });

  res.status(200).render('profile', {
    title: 'Twój profil',
    orders
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ countrySlug: req.params.slug });

  const reviews = await Review.find({ tour: tour.id });

  res.status(200).render('tour', {
    title: `${tour.country}`,
    tour,
    reviews
  });
});

exports.getTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .paginate()
    .sort()
    .filter();
  const tours = await features.query;

  const sum = await Tour.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('tours', {
    title: 'Wycieczki',
    tours,
    sum
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userek = await User.findById(req.params.id);

  const orders = await Order.find({ user: req.params.id });

  if (!userek) next(new AppError('Brak tego użytkownika w bazie danych', 404));

  let userName;
  if (userek.name) userName = userek.name;
  else userName = 'Profil użytkownika';

  res.status(200).render('user', {
    title: `${userName}`,
    userek,
    orders
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .paginate()
    .sort()
    .filter();
  const users = await features.query;

  const sum = await User.count({}, function(err, count) {
    if (err) console.log('Błąd podczas zliczania wyników wyszukiwania');
    else return count;
  });

  res.status(200).render('users', {
    title: 'Użytkownicy',
    users,
    sum
  });
});
