const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const users = require('./dataBase/users');
const { PORT } = require('./configs/app_config');
const { BED_REQUEST } = require('./configs/statusCodes.enum');
/////////////////////////////////////////////////////////////////////

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/404', (req, res) => {
  res.status(BED_REQUEST).render('404');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/auth', (req, res) => {
  const body = req.body;
  const { name, password } = body;
  const user = users.find(userOne => name == userOne.name);

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
  };
});

app.get('/registration', (req, res) => {
  res.render('registration');
});

app.post('/reg', (req, res) => {
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

  res.redirect('/login');
});

app.post('/check_user', (req, res) => {
  const user = req.body.submit;
  const userInfo = users.find(el => el.name === user);

  res.render('userInfo', { userInfo });
});

app.get('/users', (req, res) => {
  res.render('users', { users });
});

app.get('*', (req, res) => {
  res.redirect('/404');
});

app.listen(PORT);
