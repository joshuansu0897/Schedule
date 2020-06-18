'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })

  return User
}