const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../utils/database");
const { v4: uuidv4 } = require("uuid");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
