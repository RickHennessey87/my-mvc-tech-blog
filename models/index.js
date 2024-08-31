const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPost = require('./BlogPost');

module.exports = {
    BlogPost,
}