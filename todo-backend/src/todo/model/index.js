const Sequelize = require('sequelize');
const config =
  require('../../../config')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Todo = require('./todo')(sequelize, Sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
