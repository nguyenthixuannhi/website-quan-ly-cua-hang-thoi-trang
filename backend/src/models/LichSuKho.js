const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LichSuKho = sequelize.define(
    'LICHSUKHO',
    {
      id_lich_su: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_bien_the: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_nguoi_dung: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      loai_thao_tac: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      so_luong_thay_doi: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'LICHSUKHO',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return LichSuKho;
};

