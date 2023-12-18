const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../utils/database");
const { v4: uuidv4 } = require("uuid");

const OrderCart = sequelize.define("order_cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = OrderCart;
