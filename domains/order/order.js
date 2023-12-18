const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../utils/database");
const { v4: uuidv4 } = require("uuid");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
