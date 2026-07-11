const { sequelize } = require('../../db/connection');

const NguoiDungModel = require('./NguoiDung');

const models = {
  NguoiDung: NguoiDungModel(sequelize),
};

// assoc placeholder

module.exports = { sequelize, models };

