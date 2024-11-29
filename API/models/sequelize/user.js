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
        isUnique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
            len: [8, 20]
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

export default User;
