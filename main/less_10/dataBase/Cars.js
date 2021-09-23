const { Schema, model } = require('mongoose');

const carsSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: true,
  },
  brand: {
    trim: true,
    unique: true,
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model('cars', carsSchema);
