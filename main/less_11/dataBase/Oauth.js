const { Schema, model } = require('mongoose');
const { USER, OAUTH } = require('../configs/dataBAseTable.enum');

const oauthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  [USER]: {
    ref: USER,
    required: true,
    type: Schema.Types.ObjectId,
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

oauthSchema.pre('findOne', function () {
  this.populate(USER);
});

module.exports = model(OAUTH, oauthSchema);
