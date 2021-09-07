const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (pass, hashPass) => {
    const isPasswordsMatched = await bcrypt.compare(pass, hashPass);

    if (!isPasswordsMatched) {
      throw new ErrorHandler(BAD_REQUEST, 'Not valid values');
    }
  }
};
