const Sequelize = require('sequelize');
require('dotenv').config();

console.log('Database Name:', process.env.DB_NAME);
console.log('Database User:', process.env.DB_USER);
console.log('Database Password:', process.env.DB_PASSWORD);
console.log('Database Host:', process.env.DB_HOST || 'localhost');
console.log('Database Port:', process.env.DB_PORT || 5432);

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: console.log
    }
);

module.exports = sequelize;
