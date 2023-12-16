const Product = require("../product");
const { Op, where } = require("sequelize");

/**
 * Get List Data
 * @param {Object} params
 */

const list = async (params) => {
  let filters = {};
  let op = {};

  // filter : search
  if (params.search && params.search !== "") {
    op[Op.or] = [{ name: { [Op.like]: `%${params.search}%` } }];
  }

  let total = await Product.count();

  // get total filtered
  let totalFiltered = await Product.count({ where: filters });

  // pagination
  if (params.page && params.limit) {
    let pageVal = parseInt(params.page);
    let limitVal = parseInt(params.limit);
    let offset = (pageVal - 1) * limitVal;

    filters.offset = offset;
    filters.limit = limitVal;
  }

  // get data
  const data = await Product.findAll({ ...filters, where: op });

  // return
  return {
    data: data,
    meta: {
      page: params.page,
      limit: params.limit,
      total: total,
      total_filtered: totalFiltered,
    },
  };
};

/**
 * Find By ID
 * @param {String} id
 */
const findById = async (id) => {
  return Product.findByPk(id);
};

/**
 * Create New Data
 * @param {Object} data
 */
const save = async (data) => {
  return Product.create(data);
};

/**
 * Update One Data with filter ID
 * @param {String} id
 * @param {Object} data
 */
const updateOne = async (id, data) => {
  console.log(data);
  const product = await Product.findByPk(id);
  if (product) {
    await product.update(data);
    return product;
  }
  return null;
};

/**
 * Delete One Data with filter ID
 * @param {String} id
 */
const deleteOne = async (id) => {
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    return true;
  }
  return false;
};

module.exports = {
  save,
  updateOne,
  deleteOne,
  findById,
  list,
};
