const jwtService = require('../services/jwt.service');
const { userNormalizator } = require('../utils/user.util');
const { Oauth, ActionsToken, User } = require('../dataBase');
const statusCodesEnum = require('../configs/statusCodes.enum');
const { constants, config, emailActions } = require('../configs');
const { generateTokenPars } = require('../services/jwt.service');
const { emailService, hashPasswordService } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await hashPasswordService.compare(password, user.password);

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
  },

  sendMailForgotPassword: async (req, res, next) => {
    try {
      const { user } = req;
      const actionToken = jwtService.generateTokenType(config.FORGOT_PASSWORD);

      await ActionsToken.create({ token: actionToken, user: user._id });
      await emailService.sendEmail(
        user.email,
        emailActions.FORGOT_PASSWORD,
        { forgotPassURL: `${config.FRONTEND_URL}/forgot?token${actionToken}` }
      );

      res.json('Email was sent');
    } catch (e) {
      next(e);
    }
  },

  setUserPassword: async (req, res, next) => {
    try {
      const { currentUser, body } = req;
      const token = req.get(constants.AUTHORIZATION);

      const hashedPassword = await hashPasswordService.hash(body.password);

      await User.findOneAndUpdate(currentUser._id, { password: hashedPassword });
      await ActionsToken.deleteOne({ token });
      await Oauth.deleteMany({ user: currentUser._id });

      res.json('ok');
    } catch (e) {
      next(e);
    }
  }
};
