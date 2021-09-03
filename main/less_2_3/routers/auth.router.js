const router = require('express').Router();

const { authControllers } = require('../controllers/auth.controllers');

router.post('/', authControllers);

module.exports = router;
