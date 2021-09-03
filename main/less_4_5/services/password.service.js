const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (pass, hashPass) => {
    const isPasswordsMatched = await bcrypt.compare(pass, hashPass);

    if (!isPasswordsMatched) {
      throw new ErrorHandler(400, 'Not valid values');
    }
  }
};
