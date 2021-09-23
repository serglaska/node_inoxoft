const ErrorHandler = require('../errors/ErrorHandler');

const {
  CONFLICT,
  NOT_FOUND,
  FORBIDDEN,
} = require('../configs/statusCodes.enum');

module.exports = {
  isEmailExist: (req, res, next) => {
    try {
      const { user } = req;

      if (user) {
        throw new ErrorHandler(CONFLICT, 'Email is already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserByIdExist: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(NOT_FOUND, 'User not founded');
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  checkUserRole: (availableRoles = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if (!availableRoles.length) next();

      if (!availableRoles.includes(role)) throw new ErrorHandler(FORBIDDEN, 'Forbidden');

      next();
    } catch (e) {
      next(e);
    }
  },
};
