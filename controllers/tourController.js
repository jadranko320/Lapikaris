const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Jako załącznik proszę dodać zdjęcie', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([{ name: 'gallery', maxCount: 100 }]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.gallery = [];

  await Promise.all(
    req.files.gallery.map(async (file, i) => {
      const filename = `tour-${Math.floor(
        Math.random() * 99999999999999
      )}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(1600, 900)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.gallery.push(filename);
    })
  );
  next();
});

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour);
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
