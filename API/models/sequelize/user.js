import { DataTypes } from 'sequelize';
import  sequelize from '../../config/sequelize.js'; 

const User = sequelize.define('User', {
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
        unique: true,
        validate: {
            isEmail: true
        }
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            is: /^[0-9a-f]{64}$/i, // Ensures the value is a 64-character hexadecimal string
        }
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
  },
  {
    timestamps: false
  }
);

sequelize.sync();

export default User;
