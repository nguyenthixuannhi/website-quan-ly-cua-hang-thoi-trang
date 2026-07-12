const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TraHang = sequelize.define(
    'TRAHANG',
    {
      id_phieu_tra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_don_hang: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      ly_do: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'TRAHANG',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return TraHang;
};

