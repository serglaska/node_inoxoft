const { Oauth } = require('../dataBase');
const constants = require('../configs/constants');
const jwtService = require('../services/jwt.service');
const ErrorHandler = require('../errors/ErrorHandler');
const dataBaseTable = require('../configs/dataBAseTable.enum');
const statusCodesEnum = require('../configs/statusCodes.enum');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'No token');
      }

      jwtService.verifyToken(token);

      const tokenFromDB = await Oauth.findOne({ access_token: token }).populate(dataBaseTable.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
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
        throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'No token');
      }

      jwtService.verifyToken(token, 'refresh');

      const tokenFromDB = await Oauth.findOne({ refresh_token: token }).populate(dataBaseTable.USER);

      if (!tokenFromDB) {
        throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
      }

      req.currentUser = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
