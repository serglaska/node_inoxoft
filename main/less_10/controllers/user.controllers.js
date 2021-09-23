const { User } = require('../dataBase/index');
const { emailService } = require('../services');
const { userNormalizator } = require('../utils/user.util');
const { emailActions, statusCodes, textBody } = require('../configs');

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const { user } = req;

      await emailService.sendEmail('eco-slim@protonmail.com', emailActions.WELCOME);

      const normalizeUser = userNormalizator(user);
      res.json(normalizeUser);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { email, name } = req.body;

      const user = await User.createWithHashPassword(req.body);
      const normalizeUser = userNormalizator(user);

      await emailService.sendEmail(
        email,
        emailActions.WELCOME,
        {
          userName: name,
          specialText: textBody.specialText,
        }
      );

      res.status(statusCodes.CREATED).json(normalizeUser);
      next();
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await User.findByIdAndDelete(user_id);
      res.json({ message: `User ${user_id} was deleted` });
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await User.findByIdAndUpdate(user_id, req.body);

      res.json({ message: `User ${user_id} was updated` });
      next();
    } catch (e) {
      next(e);
    }
  }
};
