const Order = require("../order");
const Product = require("../../product/product");
const Cart = require("../../cart/cart");
const { Op, where } = require("sequelize");
const { index } = require("./service");
const OrderCart = require("../order_cart");

/**
 * Find By ID
 * @param {Object} params
 */

const list = async (params) => {
  // get data

  const orders = await Order.findAll();
  const responseDataOrder = await Promise.all(
    orders.map(async (data, index) => {
      const respOrderCart = await OrderCart.findAll({
        where: {
          order_id: data.dataValues.id,
        },
      });
      const respProductData = await Promise.all(
        respOrderCart.map(async (data, index) => {
          const respProduct = await Product.findOne({
            where: {
              id: data.dataValues.product_id,
            },
          });
          const produtDataValuer = respProduct.dataValues;
          const dataValuer = data.dataValues;
          return {
            ...dataValuer,
            ...produtDataValuer,
          };
        })
      );
      const produtOrderValuer = data.dataValues;
      // console.log(respProductData);
      const orderwithreturn = {
        ...produtOrderValuer,
        data: respProductData,
      };

      return orderwithreturn;
    })
  );
  return {
    data: responseDataOrder,
  };
};

/**
 * Find By ID
 * @param {String} id
 */
const cartUser = async (id) => {
  return Cart.findAll({
    where: {
      user_id: id,
    },
  });
};
/**
 * Find By ID
 * @param {String} order_id
 * @param {String} product_id
 * @param {Number} quantity
 * @param {String} note
 */
const createOrderCart = async (order_id, product_id, quantity, note) => {
  // console.log(data);
  dataOrder = {
    order_id,
    product_id,
    quantity,
    note,
  };
  return await OrderCart.create(dataOrder);
};

/**
 * Create New Data
 * @param {Object} data
 */
const createOrderUser = async (data) => {
  return Order.create(data);
};

/**
 * Create New Data
 * @param {Object} data
 */
const createOrder = async (data) => {
  const dataOrder = await createOrderUser(data);
  const listCard = await cartUser(data.user_id);
  listCard.map(async (data) => {
    await createOrderCart(dataOrder.dataValues.id, data.dataValues.product_id, data.dataValues.quantity, data.dataValues.note);
  });
};

module.exports = {
  createOrder,
  list,
};
