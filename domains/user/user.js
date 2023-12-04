const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../utils/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    registered_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    // Other model options...
  }
);

module.exports = User;
