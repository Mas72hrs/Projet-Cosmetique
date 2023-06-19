module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define("Categorie", {
    nomCategorie: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Categorie.associate = function (models) {
    Categorie.hasMany(models.Produit, { onDelete: "CASCADE" }); // add the association to the Departement model
  };

  // Categorie.sync({ force: true })
  //   .then(() => {
  //     console.log("table synced");
  //   })
  //   .catch(() => {
  //     console.log("error syncing ");
  //   });

  return Categorie;
};
