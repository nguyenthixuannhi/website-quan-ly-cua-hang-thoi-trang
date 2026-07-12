const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChiTietPhieuNhap = sequelize.define(
    'CHITIETPHIEUNHAP',
    {
      id_chi_tiet_nhap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_don_nhap: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_bien_the: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      so_luong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'CHITIETPHIEUNHAP',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChiTietPhieuNhap;
};

