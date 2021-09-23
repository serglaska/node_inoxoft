const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const cronJobs = require('./cron');
const { SERVER_ERROR } = require('./configs/statusCodes.enum');
const { PORT, DB_CONNECT_URL, ALLOWED_ORIGIN } = require('./configs/app_config');

const app = express();

mongoose
  .connect(DB_CONNECT_URL)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.use(cors({
  _origin: _configureCORS
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});

app.use(limiter);
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(helmet());
if (process.env.ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

const {
  userRouter,
  carsRouter,
  authRouter,
} = require('./routers');

app.use('/cars', carsRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(_mainErrorHandler);

app.listen(PORT, cronJobs());

// eslint-disable-next-line
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || SERVER_ERROR)
    .json({
      message: err.message || 'Unknown error'
    });
}

function _configureCORS(origin, callback) {
  const whiteList = ALLOWED_ORIGIN;
  if (!origin) {
    return (callback(null, true));
  }

  if ([whiteList].includes(origin)) {
    return callback(new Error('CORS Mistakes'), false);
  }

  return callback(null, true);
}
