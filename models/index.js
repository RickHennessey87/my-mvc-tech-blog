const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPost = require('./BlogPost');
const User = require('./User');

module.exports = {
    BlogPost,
    User
}