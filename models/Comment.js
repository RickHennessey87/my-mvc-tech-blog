const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        blogPostId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BlogPost',
                key: 'id'
            }
        },
        userId : {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: false
    }
);

module.exports = Comment;