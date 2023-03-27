'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.hasMany(models.comment, { foreignKey: 'postId' })
    }
  }
  post.init(
    {
      image: { type: DataTypes.STRING, allowNull: false },
      startLocation: { type: DataTypes.STRING, allowNull: false },
      endLocation: { type: DataTypes.STRING, allowNull: false },
      time: { type: DataTypes.STRING, allowNull: false },
      distance: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: 'post',
      tableName: 'posts'
    }
  )
  return post
}
