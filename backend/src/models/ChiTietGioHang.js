const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChiTietGioHang = sequelize.define(
    'CHITIETGIOHANG',
    {
      id_ct_gio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_gio_hang: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_bien_the: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      so_luong: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'CHITIETGIOHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChiTietGioHang;
};

