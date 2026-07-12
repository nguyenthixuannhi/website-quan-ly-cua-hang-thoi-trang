const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SanPham = sequelize.define(
    'SANPHAM',
    {
      id_san_pham: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_danh_muc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ten_san_pham: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      anh_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'SANPHAM',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return SanPham;
};

