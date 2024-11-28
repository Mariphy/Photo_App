import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize'; 

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  clientSecret: {
    type: DataTypes.STRING,
    allowNull: false
  },
  redirectUris: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  grants: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
});

sequelize.sync();

export default Client;