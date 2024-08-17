const { DataTypes } = require('sequelize');
const sequelize = require('../../config/index');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: true,
        isEmail: true
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        len: [8,20]
    }
    
  },
  {
    timestamps: false
  }
);

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

module.exports = User;
