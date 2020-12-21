const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Podaj kraj docelowy wycieczki'],
      trim: true,
      maxlength: [40, 'Nazwa kraju nie może mieć więcej niż 60 znaków'],
      unique: [true, 'Może istnieć tylko jedna wycieczka do danego kraju']
    },
    english: {
      type: String,
      required: [true, 'Podaj kraj docelowy wycieczki po angielsku'],
      trim: true,
      maxlength: [40, 'Nazwa kraju nie może mieć więcej niż 60 znaków'],
      unique: [true, 'Może istnieć tylko jedna wycieczka do danego kraju']
    },
    countrySlug: String,
    category: {
      type: String,
      trim: true,
      required: [true, 'Podaj kategorię'],
      enum: {
        values: ['summer', 'winter', 'tour', 'exotic'],
        message:
          'Wartości, jakie może przyjąć baza danych to: summer, winter, tour, exotic'
      }
    },
    city: {
      type: String,
      required: [true, 'Podaj miejsce docelowe wycieczki'],
      trim: true,
      maxlength: [
        40,
        'Nazwa miejsca docelowego nie może mieć więcej niż 60 znaków'
      ]
    },
    citySlug: String,
    startDate: {
      type: String,
      required: [true, 'Podaj termin wycieczki'],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'Podaj czas trwania wycieczki']
    },
    flight: {
      type: String,
      required: [true, 'Podaj miejsce wylotu'],
      trim: true,
      maxlength: [40, 'Miejsce wylotu nie może mieć więcej niż 60 znaków']
    },
    feeding: {
      type: String,
      required: [true, 'Podaj zakres wyżywienia'],
      enum: {
        values: ['2 posiłki', '3 posiłki', 'All Inclusive'],
        message:
          'Wartości, jakie może przyjąć baza danych to: 2 meals, 3 meals, All Inclusive'
      }
    },
    price: {
      type: Number,
      required: [true, 'Podaj cenę wycieczki']
    },
    descriptionText: {
      type: [String],
      trim: true
    },
    gallery: [String],
    limit: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.pre('save', function(next) {
  this.countrySlug = slugify(this.english, { lower: true });
  this.citySlug = slugify(this.city, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
