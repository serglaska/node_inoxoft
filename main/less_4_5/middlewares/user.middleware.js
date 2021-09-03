const { User } = require('../dataBase/index');
const ErrorHandler = require('../errors/ErrorHandler');
const { createUserValidator, updateUserValidator } = require('../validators/user.validator');

module.exports = {
  isEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email: email.trim() });

      if (userByEmail) {
        throw new ErrorHandler(409, 'Email is already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserByIdExist: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id).select('+password');

      if (!user) {
        throw new ErrorHandler(404, 'User not founded');
      }

      req.locals = {
        user,
        testParam: 'Middleware is working'
      };

      next();
    } catch (err) {
      next(err);
    }
  },

  isValidUserData: (req, res, next) => {
    try {
      const { error, value } = createUserValidator.validate(req.body);
      if (error) throw new ErrorHandler(400, error.details[0].message);

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  },

  isValidUpdateUser: (req, res, next) => {
    try {
      const { error, value } = updateUserValidator.validate(req.body);
      if (error) throw new ErrorHandler(400, error.details[0].message);

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
};
