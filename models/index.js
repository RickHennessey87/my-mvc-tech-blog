const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const BlogPost = require('./BlogPost');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: 'userId'
});

BlogPost.belongsTo(User, {
    foreignKey: 'userId'
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blogPostId'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPostId'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});


module.exports = {
    BlogPost,
    User,
    Comment,
    sequelize
};