const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DanhMuc = sequelize.define(
    'DANHMUC',
    {
      id_danh_muc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ten_danh_muc: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'DANHMUC',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return DanhMuc;
};

