module.exports = (sequelize, DataTypes) => {
  const Vente = sequelize.define("Vente", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prixTotal: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0,
    },
    productsBought: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "aucun produit ",
    },
  });
  Vente.associate = function (models) {
    Vente.belongsTo(models.User); // A Vente is made by an employee
  };

  //   CartItems.sync({ force: true })
  //     .then(() => {
  //       console.log("table synced");
  //     })
  //     .catch(() => {
  //       console.log("error syncing ");
  //     });

  return Vente;
};
