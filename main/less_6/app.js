const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { SERVER_ERROR } = require('./configs/statusCodes.enum');

const app = express();
const { PORT, DB_CONNECT_URL } = require('./configs/app_config');

mongoose
  .connect(DB_CONNECT_URL)
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
    .status(err.status || SERVER_ERROR)
    .json({
      message: err.message || 'Unknown error'
    });
}
