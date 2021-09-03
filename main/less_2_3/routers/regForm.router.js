const router = require('express').Router();

const { regFormControllers } = require('../controllers/regForm.controllers');

router.post('/', regFormControllers);

module.exports = router;
