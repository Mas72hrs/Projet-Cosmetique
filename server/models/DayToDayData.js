module.exports = (sequelize, DataTypes) => {
  const DayToDayData = sequelize.define("DayToDayData", {
    nbrVentesDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dateToDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    profitDay: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  });

  return DayToDayData;
};
