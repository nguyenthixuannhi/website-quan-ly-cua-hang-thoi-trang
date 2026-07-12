const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GioHang = sequelize.define(
    'GIOHANG',
    {
      id_gio_hang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'GIOHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return GioHang;
};

