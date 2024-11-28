import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize({
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD
  });

export default sequelize;