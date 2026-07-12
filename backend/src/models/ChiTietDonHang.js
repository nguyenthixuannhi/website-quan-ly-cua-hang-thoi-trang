const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChiTietDonHang = sequelize.define(
    'CHITIETDONHANG',
    {
      id_ct_don: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_don_hang: {
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
      don_gia_thuc: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'CHITIETDONHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChiTietDonHang;
};

