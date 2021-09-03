const { User } = require('../dataBase/index');
const { userNormalizator } = require('../utils/user.util');
const hashPasswordService = require('../services/password.service');

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);

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
      const { password } = req.body;

      const hashedPassword = await hashPasswordService.hash(password);
      const user = await User.create({ ...req.body, password: hashedPassword });

      const normalizeUser = userNormalizator(user);

      res.status(201).json(normalizeUser);
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
