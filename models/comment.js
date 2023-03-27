'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.user, { foreignKey: 'userId' })
      comment.belongsTo(models.post, { foreignKey: 'postId' })
      // define association here
    }
  }
  comment.init(
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
      modelName: 'comment',
      tableName: 'comments'
    }
  )
  return comment
}
