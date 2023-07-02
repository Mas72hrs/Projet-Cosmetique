module.exports = (sequelize, DataTypes) => {
  const Credit = sequelize.define("Credit", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prixTotalCredit: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Credit.associate = function (models) {
    Credit.belongsTo(models.User); // A Credit is made by an employee
  };

  return Credit;
};
