const path = require('path');
const express = require('express');

const hbs = require('express-handlebars');
const { PORT } = require('./configs/app_config');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({ defaultLayout: false }));
app.set('views', staticPath);

const mainRouter = require('./routers');

const {
  userRouter,
  authRouter,
  loginRouter,
  regFormRouter,
  userInfoRouter,
  badRequestRouter,
  registrationRouter
} = mainRouter;

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/reg', regFormRouter);
app.use('/user', userInfoRouter);
app.use('/not-found', badRequestRouter);
app.use('/registration', registrationRouter);

app.get('*', (req, res) => {
  res.redirect('/not-found');
});

app.listen(PORT);
