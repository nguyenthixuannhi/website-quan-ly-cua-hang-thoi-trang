const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QuangCao = sequelize.define(
    'QUANGCAO',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tieu_de: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      url_hinh_anh: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      url_dich: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      mua: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      danh_muc_trong_tam: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ngay_bat_dau: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ngay_ket_thuc: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      uu_tien: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      kich_hoat: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      ngay_tao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'QUANGCAO',
      timestamps: false,
      freezeTableName: true,
    }
  );

  return QuangCao;
};

