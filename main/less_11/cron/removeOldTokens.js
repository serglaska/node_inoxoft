const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { ActionsToken, Oauth } = require('../dataBase');

dayjs.extend(utc);

module.exports = async () => {
  const previousMonth = dayjs.utc('2021-09-15').subtract(1, 'month');

  console.log('cron works');

  await Oauth.deleteMany({ createAt: { $lte: previousMonth } });
  await ActionsToken.deleteMany({ createAt: { $lte: previousMonth } });
};
