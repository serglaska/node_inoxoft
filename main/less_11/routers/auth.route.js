const router = require('express').Router();

const { actionsType } = require('../configs');
const { isUserByIdExist } = require('../middlewares/user.middleware');
const { getUserByDynamicParam } = require('../services/getItemByParam.service');
const {
  checkAccessToken,
  checkActionToken,
  checkRefreshToken,
  passwordValidator,
} = require('../middlewares/oauth.middleware');
const {
  login,
  logout,
  refresh,
  setUserPassword,
  sendMailForgotPassword
} = require('../controllers/auth.controllers');

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

router.post(
  '/forgot-password',
  getUserByDynamicParam({
    db: 'user',
    item: 'user',
    paramName: 'email'
  }),
  checkRefreshToken,
  sendMailForgotPassword
);

router.post(
  '/forgot-password/set',
  passwordValidator,
  checkActionToken(actionsType.FORGOT_PASSWORD),
  setUserPassword
);

module.exports = router;
