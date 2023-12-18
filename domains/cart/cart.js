const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../utils/database");
const { v4: uuidv4 } = require("uuid");
const Product = require("../product/product");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Cart;
