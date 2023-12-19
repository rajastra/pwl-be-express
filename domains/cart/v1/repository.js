const Cart = require("../cart");
const Product = require("../../product/product");
const { Op, where } = require("sequelize");
const { index } = require("./service");

/**
 * Find By ID
 * @param {Object} params
 */

const list = async (params) => {
  // get data
  const cartData = await Cart.findAll({
    where: {
      user_id: params.id,
    },
  });

  const productIds = cartData.map(async (data) => {
    return await Product.findByPk(data.product_id);
  });
  const productList = await Promise.all(productIds);

  const responseData = productList.map((data, index) => {
    const cart = cartData[index];
    const product = data.dataValues;
    return {
      ...product,
      cart_id: cart.id,
      quantity: cart.quantity,
      note: cart.note,
    };
  });

  return {
    data: responseData,
  };
};

/**
 * Find By ID
 * @param {String} id
 */
const findById = async (id) => {
  return Cart.findByPk(id);
};

/**
 * Create New Data
 * @param {Object} data
 */
const save = async (data) => {
  return Cart.create(data);
};

/**
 * Delete One Data with filter ID
 * @param {String} id
 */
const deleteOne = async (id) => {
  const cart = await Cart.findByPk(id);
  if (cart) {
    await cart.destroy();
    return true;
  }
  return false;
};

module.exports = {
  save,
  deleteOne,
  findById,
  list,
};
