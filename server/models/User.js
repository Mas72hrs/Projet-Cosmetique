module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [8, undefined],
          msg: "Password must be at least 8 characters long",
        },
      },
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.ENUM("Homme", "Femme"),
      allowNull: false,
      defaultValue: "Homme",
    },
    telephone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        is: /^\d{10}$/, // Regular expression to validate a 10-digit phone number
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "vendeur"),
      allowNull: false,
      defaultValue: "vendeur",
    },
    sales_mois: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    numTotalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sales_value: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Vente);
  };
  // User.sync({ force: true })
  //   .then(() => {
  //     console.log("table synced");
  //   })
  //   .catch(() => {
  //     console.log("error syncing ");
  //   });

  return User;
};
