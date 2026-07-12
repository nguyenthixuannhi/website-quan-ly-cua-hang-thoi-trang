const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DonHang = sequelize.define(
    'DONHANG',
    {
      id_don_hang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      loai_don: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      trang_thai: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ngay_tao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'DONHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return DonHang;
};

