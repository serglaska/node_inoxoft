const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { UNAUTHORIZED } = require('../configs/statusCodes.enum');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/app_config');

module.exports = {
  generateTokenPars: () => {
    const access_token = jwt.sign(
      {},
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const refresh_token = jwt.sign(
      {},
      REFRESH_TOKEN_SECRET,
      { expiresIn: '31d' }
    );

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: (token, tokenType = 'access') => {
    try {
      const secret = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

      jwt.verify(token, secret);
    } catch (e) {
      throw new ErrorHandler(UNAUTHORIZED, 'Invalid token');
    }
  }
};
