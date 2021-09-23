const { Schema, model } = require('mongoose');
const { USER, ACTIONS_TOKEN } = require('../configs/dataBAseTable.enum');

const ActionToken = new Schema({
  token: {
    type: String,
    required: true
  },
  [USER]: {
    ref: USER,
    required: true,
    type: Schema.Types.ObjectId,
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model(ACTIONS_TOKEN, ActionToken);
