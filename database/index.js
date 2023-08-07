const Sequelize = require('sequelize');

const {
    DATABASE: {
      name,
      username,
      password,
      options,
    },
} = require('./../config');

const models = require('./models');

let database = {};

const sequelize = new Sequelize(name, username, password, { ...options });

database = models(sequelize, Sequelize);

database.Sequelize = Sequelize;

database.authenticate = () => sequelize.authenticate();

database.authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('database connection failed:', err);
  });

module.exports = database;