const { Schema, model } = require('mongoose');
const { ADMIN, USER } = require('../configs/userRoles.enum');

const userSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: true,
  },
  email: {
    trim: true,
    unique: true,
    type: String,
    required: true,
  },
  password: {
    trim: true,
    type: String,
    select: false,
    required: true,
  },
  role: {
    type: String,
    default: USER,
    enum: [
      USER,
      ADMIN
    ],
  }
}, { timestamps: true });

module.exports = model('user', userSchema);
