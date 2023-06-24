module.exports = (sequelize, DataTypes) => {
  const CartItems = sequelize.define("CartItems", {
    nomProduit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    itemPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
  });

  CartItems.associate = function (models) {
    CartItems.belongsTo(models.Produit); // add the association to the Departement model
  };

  //   CartItems.sync({ force: true })
  //     .then(() => {
  //       console.log("table synced");
  //     })
  //     .catch(() => {
  //       console.log("error syncing ");
  //     });

  return CartItems;
};
