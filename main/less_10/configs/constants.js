module.exports = {
  AUTHORIZATION: 'Authorization',
  CURRENT_YEAR: new Date().getFullYear(),
  PASSWORD_REGEXP: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
};
