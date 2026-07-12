const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DonNhapHang = sequelize.define(
    'DONNHAPHANG',
    {
      id_don_nhap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_nha_cung_cap: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ngay_nhap: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'DONNHAPHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return DonNhapHang;
};

