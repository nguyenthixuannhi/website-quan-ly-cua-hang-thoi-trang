const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChuongTrinhGiamGia = sequelize.define(
    'CHUONGTRINHGIAMGIA',
    {
      id_giam_gia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ten_chuong_trinh: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phan_tram_giam: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      tableName: 'CHUONGTRINHGIAMGIA',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ChuongTrinhGiamGia;
};

