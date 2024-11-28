import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  database: 'PhotoApp',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD
  });

export default sequelize;