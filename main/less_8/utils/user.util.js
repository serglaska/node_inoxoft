const userNormalizator = (userToNormalize) => {
  const fileToRemove = [
    'password',
    '__v'
  ];

  userToNormalize = userToNormalize.toJSON();

  fileToRemove.forEach((filed) => delete userToNormalize[filed]);

  return userToNormalize;
};

module.exports = {
  userNormalizator
};
