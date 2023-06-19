module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define("Produit", {
    codeBar: {
      type: DataTypes.STRING, // String data type for barcode
      allowNull: true,
      unique: true,
    },
    nomProduit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0,
      },
    },

    prix_A: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    prix_V: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    nbr_vente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    DExp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });

  // Produit.sync({ force: true })
  //   .then(() => {
  //     console.log("table synced");
  //   })
  //   .catch(() => {
  //     console.log("error syncing ");
  //   });
  Produit.associate = function (models) {
    Produit.belongsTo(models.Categorie);
  };

  // Produit.sync({ alert: true })
  //   .then(() => {
  //     console.log("table synced");
  //   })
  //   .catch(() => {
  //     console.log("error syncing ");
  //   });

  return Produit;
};
