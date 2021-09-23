const jwtService = require('../services/jwt.service');
const { Oauth, ActionsToken } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { constants, statusCodes } = require('../configs');
const { passwordValidator } = require('../validators/user.validator');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
      }

      jwtService.verifyToken(token);

      const tokenFromDB = await Oauth.findOne({ access_token: token });

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
      }

      jwtService.verifyToken(token, 'refresh');

      const tokenFromDB = await Oauth.findOne({ refresh_token: token });

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkActionToken: (actionType) => async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
      }

      jwtService.verifyActionToken(actionType, token);

      const tokenFromDB = await ActionsToken.findOne({ token });

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  passwordValidator: (req, res, next) => {
    try {
      const { error, value } = passwordValidator.validate(req.body);

      if (error) throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  },
};
