const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT } = require('./configs/app_config');

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

const {
  userRouter,
  carsRouter
} = require('./routers');

app.use('/cars', carsRouter);
app.use('/users', userRouter);

app.use(_mainErrorHandler);

app.listen(PORT);

// eslint-disable-next-line
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}
