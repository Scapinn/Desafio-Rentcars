const Sequelize = require('sequelize');

const sequelize = new Sequelize('desafio_rentcars', 'root', 'ANSKk08aPEDbFjDO', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
