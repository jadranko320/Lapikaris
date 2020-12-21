const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Jako załącznik proszę podać zdjęcie', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  req.body.photo = req.file.filename;

  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.setUserId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.changeStatus = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Nie znaleziono użytkownika z takim ID', 404));
  }

  if (user.active === true)
    await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        new: true,
        runValidators: true
      }
    );
  else
    await User.findByIdAndUpdate(
      req.params.id,
      { active: true },
      {
        new: true,
        runValidators: true
      }
    );

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.changeRole = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Nie znaleziono użytkownika z takim ID', 404));
  }

  if (user.role === 'admin')
    await User.findByIdAndUpdate(
      req.params.id,
      { role: 'user' },
      {
        new: true,
        runValidators: true
      }
    );
  else
    await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      {
        new: true,
        runValidators: true
      }
    );

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Proszę użyć adresu /signup'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
