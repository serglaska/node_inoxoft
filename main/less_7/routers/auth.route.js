const router = require('express').Router();

const { isUserByIdExist } = require('../middlewares/user.middleware');
const { login, logout, refresh } = require('../controllers/auth.controllers');
const { getUserByDynamicParam } = require('../services/getItemByParam.service');
const { checkAccessToken, checkRefreshToken } = require('../middlewares/oauth.middleware');

router.post(
  '/',
  getUserByDynamicParam({
    db: 'user',
    item: 'user',
    paramName: 'email'
  }),
  isUserByIdExist,
  login
);

router.post(
  '/logout',
  checkAccessToken,
  logout
);

router.post(
  '/refresh',
  checkRefreshToken,
  refresh
);

module.exports = router;
