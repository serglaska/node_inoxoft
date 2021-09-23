const { GOODBYE, WELCOME, FORGOT_PASSWORD } = require('../configs/emailActions.enum');

module.exports = {
  [GOODBYE]: {
    templateName: 'goodbye',
    subject: 'Have a nice September'
  },
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },
  [FORGOT_PASSWORD]: {
    subject: 'Password forgot',
    templateName: 'forgot-password',
  }
};
