const mongoose = require('mongoose');

const poinstSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitutde: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  locations: [poinstSchema],
});

mongoose.model('Track', trackSchema);
