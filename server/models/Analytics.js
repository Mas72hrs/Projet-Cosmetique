module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define("Analytics", {
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mois: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nbrVentes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    profit_mois: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  });

  return Analytics;
};
