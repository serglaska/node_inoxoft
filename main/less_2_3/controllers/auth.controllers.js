const users = require('../dataBase/users');

module.exports = {
  authControllers: (req, res) => {
    const { body } = req.body;
    const { name, password } = body;
    const user = users.find((userOne) => name === userOne.name);

    if (!user) {
      res.redirect('/registration');

      return;
    }

    const userPassword = user.password;
    const userName = user.name;

    if (name === userName && password === userPassword) {
      res.redirect('/users');
    } else {
      res.render('putPassword');
    }
  }
};
