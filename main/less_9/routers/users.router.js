const router = require('express').Router();

const { ALL_ROLES } = require('../configs/userRoles.enum');
const { checkAccessToken } = require('../middlewares/oauth.middleware');
const { getUserByDynamicParam } = require('../services/getItemByParam.service');
const { isValidItemData, isItemValidUpdate } = require('../services/isValidItemData.service');

const {
  isEmailExist,
  checkUserRole,
  isUserByIdExist,
} = require('../middlewares/user.middleware');

const {
  createUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
} = require('../controllers/user.controllers');

router.get('/', getAllUsers);

router.post(
  '/',
  isValidItemData('user'),
  getUserByDynamicParam({
    db: 'user',
    item: 'user',
    paramName: 'email'
  }),
  isEmailExist,
  createUser
);

router.use(
  '/:user_id',
  getUserByDynamicParam({
    db: 'user',
    item: 'user',
    dbField: '_id',
    searchIn: 'params',
    paramName: 'user_id'
  })
);
router.delete(
  '/:user_id',
  checkAccessToken,
  deleteUserById
);
router.patch(
  '/:user_id',
  checkAccessToken,
  isItemValidUpdate('user'),
  updateUser
);
router.get(
  '/:user_id',
  isUserByIdExist,
  checkAccessToken,
  checkUserRole(ALL_ROLES()),
  getUserById
);

module.exports = router;
