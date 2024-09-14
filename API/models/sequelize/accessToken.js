const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const AccessToken = sequelize.define('AccessToken', {
  token: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

sequelize.sync();

module.exports = AccessToken;