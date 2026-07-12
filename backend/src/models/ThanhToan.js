const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ThanhToan = sequelize.define(
    'THANHTOAN',
    {
      id_thanh_toan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_don_hang: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      phuong_thuc: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      so_tien: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
    },
    {
      tableName: 'THANHTOAN',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return ThanhToan;
};

