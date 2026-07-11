const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NguoiDung = sequelize.define(
    'NGUOIDUNG',
    {
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      mat_khau: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      vai_tro: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: 'NGUOIDUNG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return NguoiDung;
};

