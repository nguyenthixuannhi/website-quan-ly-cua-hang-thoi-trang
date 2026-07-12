const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const KieuSanPham = sequelize.define(
    'KIEUSANPHAM',
    {
      id_bien_the: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_san_pham: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: true,
        field: 'size',
      },
      mau_sac: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      so_luong_ton: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      gia_ban: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'KIEUSANPHAM',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return KieuSanPham;
};

