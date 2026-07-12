const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PhieuGiaoHang = sequelize.define(
    'PHIEUGIAOHANG',
    {
      id_phieu_giao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_don_hang: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      don_vi_van_chuyen: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      trang_thai: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: 'PHIEUGIAOHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return PhieuGiaoHang;
};

