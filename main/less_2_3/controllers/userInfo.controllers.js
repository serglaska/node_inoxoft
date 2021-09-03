const users = require('../dataBase/users');

module.exports = {
  userInfo: (req, res) => {
    const user = req.body.submit;
    const userInfo = users.find((el) => el.name === user);

    res.render('userInfo', { userInfo });
  }
};
