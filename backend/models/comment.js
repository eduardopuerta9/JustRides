'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
      Comment.belongsTo(models.Post, { foreignKey: 'postId' })
      // define association here
    }
  }
  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,

        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      userName: DataTypes.STRING,
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments'
    }
  )
  return Comment
}
