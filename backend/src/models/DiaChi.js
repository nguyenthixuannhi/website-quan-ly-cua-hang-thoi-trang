const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DiaChi = sequelize.define(
    'DIACHI',
    {
      id_dia_chi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dia_chi_chi_tiet: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'DIACHI',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return DiaChi;
};

