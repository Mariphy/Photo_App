import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize'; 

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

export default AccessToken;