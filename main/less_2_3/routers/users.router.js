const router = require('express').Router();

const users = require('../dataBase/users');

router.get('/', (req, res) => {
  res.render('users', { users });
});

module.exports = router;
