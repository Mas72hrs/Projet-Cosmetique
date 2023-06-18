module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define("Categorie", {
    nomCategorie: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Categorie.associate = function (models) {
    Categorie.hasMany(models.Produit); // add the association to the Departement model
  };

  return Categorie;
};
