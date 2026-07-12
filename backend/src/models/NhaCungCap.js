const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NhaCungCap = sequelize.define(
    'NHACUNGCAP',
    {
      id_nha_cung_cap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ten_ncc: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'NHACUNGCAP',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return NhaCungCap;
};

