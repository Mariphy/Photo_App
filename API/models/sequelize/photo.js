const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Photo = sequelize.define('Photo', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
  },
  {
    timestamps: false
  }
);

sequelize.sync();

module.exports =  Photo;