const { GOODBYE, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
  [GOODBYE]: {
    templateName: 'goodbye',
    subject: 'Have a nice September'
  },
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  }
};
