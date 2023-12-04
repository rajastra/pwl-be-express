const User = require('../user');
const sequelizeQuery = require('../../../utils/sequelizeQuery');
const constant = require('./constant');
const { Op, where } = require('sequelize');

/**
 * Get List Data
 * @param {Object} params
 */
const list = async (params) => {
  // init filters
  let filters = {};
  let op = {};

  // filter : status
  if (params.status && constant.USER_STATUS_LIST.includes(params.status)) {
    filters.status = params.status;
  }

  // filter : role
  if (params.role && constant.USER_ROLE_LIST.includes(params.role)) {
    filters.role = params.role;
  }

  // filter : search
  if (params.search && params.search !== '') {
    op[Op.or] = [
      { first_name: { [Op.like]: `%${params.search}%` } },
      { last_name: { [Op.like]: `%${params.search}%` } },
    ];
  }

  // get total user
  let total = await User.count();

  // get total filtered
  let totalFiltered = await User.count({ where: filters });

  // pagination
  if (params.page && params.limit) {
    let pageVal = parseInt(params.page);
    let limitVal = parseInt(params.limit);
    let offset = (pageVal - 1) * limitVal;

    filters.offset = offset;
    filters.limit = limitVal;
  }

  // get data
  const data = await User.findAll({ ...filters, where: op });

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
  return User.findByPk(id);
};

/**
 * Find By Email
 * @param {String} email
 */
const findByEmail = async (email) => {
  return User.findOne({ where: { email: email } });
};
/**
 * Create New Data
 * @param {Object} data
 */
const save = async (data) => {
  return User.create(data);
};

/**
 * Update One Data with filter ID
 * @param {String} id
 * @param {Object} data
 */
const updateOne = async (id, data) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.update(data);
    return user;
  }
  return null;
};

/**
 * Delete One Data with filter ID
 * @param {String} id
 */
const deleteOne = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

module.exports = {
  list,
  findById,
  findByEmail,
  save,
  updateOne,
  deleteOne,
};
