const path = require('path');
const nodeMailer = require('nodemailer');
const EmailTemplate = require('email-templates');

const { config, statusCodes } = require('../configs');
const templatesInfo = require('../emailTemplates');
const ErrorHandler = require('../errors/ErrorHandler');

const templatePArser = new EmailTemplate({
  views: {
    root: path.join(process.cwd(), 'less_8/emailTemplates'),

  }
});

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_BROADCAST,
    pass: config.EMAIL_BROADCAST_PASS
  }
});

const sendEmail = async (userForSendEmail, emailActions, context = {}) => {
  const templateToSend = templatesInfo[emailActions];

  context = { ...context, frontendURL: config.FRONTEND_URL };

  if (!templateToSend) throw new ErrorHandler(statusCodes.SERVER_ERROR, 'Wrong templates');

  const { templateName, subject } = templateToSend;

  const html = await templatePArser.render(templateName, context);

  return transporter.sendMail({
    html,
    subject,
    to: userForSendEmail,
    from: 'Congrats in our Team',
  });
};
module.exports = {
  sendEmail
};
