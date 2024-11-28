import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize'; 

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

sequelize.sync();

export default User;
