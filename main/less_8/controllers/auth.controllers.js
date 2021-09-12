const { Oauth } = require('../dataBase');
const constants = require('../configs/constants');
const jwtService = require('../services/jwt.service');
const { userNormalizator } = require('../utils/user.util');
const statusCodesEnum = require('../configs/statusCodes.enum');
const servicePassword = require('../services/password.service');
const { generateTokenPars } = require('../services/jwt.service');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await servicePassword.compare(password, user.password);

      const tokensPars = generateTokenPars();

      await Oauth.create({ ...tokensPars, user: user._id });

      res.json({
        ...tokensPars,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);

      await Oauth.deleteOne({ access_token: token });
      res.status(statusCodesEnum.NO_CONTENT).json('OK');
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { currentUser } = req;
      const refresh_token = req.get(constants.AUTHORIZATION);

      const tokensPair = jwtService.generateTokenPars();
      await Oauth.findOneAndUpdate({ refresh_token }, tokensPair);

      res.json({
        ...tokensPair,
        user: userNormalizator(currentUser)
      });
    } catch (e) {
      next(e);
    }
  }
};
