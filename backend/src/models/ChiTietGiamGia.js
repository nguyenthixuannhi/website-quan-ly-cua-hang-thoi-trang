const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChiTietGiamGia = sequelize.define(
    'CHITIETGIAMGIA',
    {
      id_chi_tiet_km: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_giam_gia: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_san_pham: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_danh_muc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'CHITIETGIAMGIA',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChiTietGiamGia;
};

