const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChiTietTraHang = sequelize.define(
    'CHITIETTRAHANG',
    {
      id_chi_tiet_tra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_phieu_tra: {
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
      tableName: 'CHITIETTRAHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChiTietTraHang;
};

