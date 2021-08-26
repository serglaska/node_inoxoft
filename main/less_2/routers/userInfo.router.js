const router = require('express').Router();
const { userInfo } = require('../controllers/userInfo.controllers');
/////////////////////////////////////////////////////////////////////

router.post('/', userInfo);

module.exports = router;
