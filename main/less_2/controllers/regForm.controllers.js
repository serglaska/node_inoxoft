const fs = require('fs');
const path = require('path');
const users = require('../dataBase/users');

module.exports = {
  regFormControllers: (req, res) => {
    const body = req.body;
    const { name, password } = body;
    const newUser = { name, password };
    const pathToDB = path.join(__dirname, 'dataBase', 'users.js');

    fs.readFile(pathToDB, (err, data) => {
      if (err) return console.log(err)

      const arrFromUsers = data.toString().split('\n').filter(el => el.includes('name'));

      if (!arrFromUsers.includes(name)) {
        users.push(newUser);
        const newDataString = `module.exports = ${JSON.stringify(users)};`

        fs.writeFile(pathToDB, newDataString, error => {
          if (error) return console.log(error);
        });
      }

      return;
    });

    res.redirect("/login");
  }
};
