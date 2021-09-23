const { Schema, model } = require('mongoose');
const { hashPasswordService } = require('../services');
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
    select: true,
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('fullName').get(function () {
  return `${this.name} ${this.email}`;
});

userSchema.pre('findOne', function () {
  this.populate(USER);
});

userSchema.static = {
  async createWithHashPassword(userObject) {
    const hashedPassword = await hashPasswordService.hash(userObject.password);
    return this.create({ ...userObject, password: hashedPassword });
  }
};

module.exports = model('user', userSchema);
