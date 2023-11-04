const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Veiculo = sequelize.define('Veiculo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  locadora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  motor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  portas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cambio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ar_condicionado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Veiculo;



