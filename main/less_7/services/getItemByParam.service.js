const { User, Cars } = require('../dataBase/index');

module.exports = {
  getUserByDynamicParam: ({
    db,
    item,
    paramName,
    searchIn = 'body',
    dbField = paramName,
  }) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const CurrentDB = db === 'user' ? User : Cars; // only this case, but also can write clever function...
      const itemValue = await CurrentDB.findOne({ [dbField]: value });

      req[item] = itemValue;

      next();
    } catch (e) {
      next(e);
    }
  }
};
