const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { UNAUTHORIZED, SERVER_ERROR } = require('../configs/statusCodes.enum');
const {
  FIRST_LOGIN,
  FORGOT_PASSWORD,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../configs/app_config');
const { actionsType } = require('../configs');

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
  },

  generateTokenType: (actionTypeArg) => {
    let word;
    switch (actionTypeArg) {
      case actionsType.FIRST_LOGIN: word = FIRST_LOGIN; break;
      case actionsType.FORGOT_PASSWORD: word = FORGOT_PASSWORD; break;
      default: throw new ErrorHandler(SERVER_ERROR, 'Wrong token');
    }

    return jwt.sign(
      actionTypeArg,
      word,
      { expiresIn: '7d' }
    );
  },

  verifyActionToken: (actionTypeArg, token) => {
    let word;
    switch (actionTypeArg) {
      case actionsType.FIRST_LOGIN: word = FIRST_LOGIN; break;
      case actionsType.FORGOT_PASSWORD: word = FORGOT_PASSWORD; break;
      default: throw new ErrorHandler(SERVER_ERROR, 'Wrong token');
    }

    return jwt.verify(token, word);
  }
};
