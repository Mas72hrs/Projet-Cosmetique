const express = require("express");
const router = express.Router();
const {
  Analytics,
  Vente,
  Produit,
  Credit,
  User,
  Categorie,
  Sequelize,
  DayToDayData,
} = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const Allanalytics = await Analytics.findAll();
  res.json(Allanalytics);
});

router.get("/byyear/:year", async (req, res) => {
  const yearRequested = req.params.year;

  // Fetch analytics for the current month
  let analyticsThisRequestedYear = await Analytics.findAll({
    where: {
      annee: parseInt(yearRequested),
    },

    order: [["mois", "ASC"]],
  });

  const defaultData = Array.from({ length: 12 }, (_, index) => ({
    annee: parseInt(yearRequested),
    mois: index + 1,
    nbrVentes: 0,
    profit_mois: 0,
    total: 0,
  }));

  analyticsThisRequestedYear.forEach((item) => {
    const { annee, mois, nbrVentes, profit_mois, total } = item;
    const monthIndex = mois - 1;
    defaultData[monthIndex] = {
      annee,
      mois,
      nbrVentes,
      profit_mois,
      total,
    };
  });

  res.json(defaultData);
});

router.get("/AllDataHere", async (req, res) => {
  try {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDay();

    // Fetch analytics for the current month
    let analyticsThisMonth = await Analytics.findOne({
      where: {
        annee: currentYear,
        mois: currentMonth + 1,
      },
    });
    //TodayData
    const todayData = await DayToDayData.findOne();

    // Fetch the count of reservations with etat = "walkIn"
    let nbrVentesAns = await Analytics.sum("nbrVentes", {
      where: {
        annee: currentYear,
      },
    });
    let nbrVentesGen = await Analytics.sum("nbrVentes");

    let totalArgentAns = await Analytics.sum("total");
    let totalProfitAns = await Analytics.sum("profit_mois");
    //somme des credits
    let sommeCredits = await Credit.sum("prixTotalCredit");
    //somme prix d'achat
    let allproduits = await Produit.findAll();
    const sommePrixDachat = allproduits.reduce((acc, product) => {
      const productPrice = product.quantite * product.prix_A;
      return acc + productPrice;
    }, 0);

    // nombre de produits outOfStock
    let nbrProduitOutStock = await Produit.count({
      where: {
        quantite: 0,
      },
    });
    let depensesProduits = await Produit.sum("prix_A");
    // nombre de credits

    let nbrCreditsTotal = await Credit.count();
    let nbrProduit = await Produit.count();

    //find all users infos
    let usersData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    // Retrieve categories with the count of products in each category
    const data = await Categorie.findAll({
      include: [{ model: Produit }],
    });
    const categoriesWithProductCount = data.map((category) => ({
      nomCategorie: category.nomCategorie,
      productCount: category.Produits.length,
    }));

    const creditData = { nbrCreditsTotal, sommeCredits };
    const produitData = { sommePrixDachat, nbrProduitOutStock, nbrProduit };
    const venteData = {
      nbrVentesAns,
      nbrVentesGen,
      totalArgentAns,
      totalProfitAns,
    };

    const allData = {
      analyticsThisMonth,
      produitData,
      venteData,
      usersData,
      creditData,
      categoriesData: categoriesWithProductCount,
      todayData: todayData,
    };

    res.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     let { annee, mois } =
//       req.body;

//     if (
//       isNaN(annee) ||
//       annee < 1900 ||
//       annee > 2100 ||
//       isNaN(mois) ||
//       mois < 1 ||
//       mois > 12
//     ) {
//       return res.status(400).json("Invalid year or month");
//     }

//     // Find or create the record in the database
//     const [analytics, created] = await Analytics.findOrCreate({
//       where: {
//         annee: annee,
//         mois: mois,
//       },
//       defaults: {
//         nbr_reservation: nbr_reservation,
//         total_reservations: total_reservations,
//         salaires_employee: TotalSalaires,
//         depenses: depenses,
//         total: total,
//         profit: profit,
//       },
//     });
//     let final;
//     if (!created) {
//       // Update the existing record with the new values
//       final = await analytics.update({
//         nbr_reservation: nbr_reservation,
//         total_reservations: total_reservations,
//         salaires_employee: TotalSalaires,
//         depenses: depenses,
//         total: total,
//         profit: profit,
//       });
//     }

//     res
//       .status(200)
//       .json(`Statistics for ${annee}-${mois} have been inserted/updated.`);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request." });
//   }
// });
router.post("/", async (req, res) => {
  try {
    let { annee, mois, nbrVentes, profit_mois, total } = req.body;

    if (
      isNaN(annee) ||
      annee < 1900 ||
      annee > 2100 ||
      isNaN(mois) ||
      mois < 1 ||
      mois > 12
    ) {
      return res.status(400).json("Invalid year or month");
    }

    // Find or create the record in the database
    const newData = await Analytics.create({
      annee: annee,
      mois: mois,
      nbrVentes: nbrVentes,
      profit_mois: profit_mois,
      total: total,
    });

    res.status(200).json({ message: "nouvelle Analytics a ete cree" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// router.delete("/parAnnee/:annee", async (req, res) => {
//   try {
//     let year = req.params.annee;

//     if (isNaN(year) || year < 1900 || year > 2100) {
//       return res.status(400).json("Invalid year ");
//     }

//     let statsDeleted = await Analytics.destroy({ where: { annee: annee } });

//     res.json(`stat de l'annee ${annee} sont supprimée`, statsDeleted);
//   } catch (err) {
//     res.status(500).json("Internal server error.");
//   }
// });

// router.delete("/parMois/:annee/:mois", async (req, res) => {
//   try {
//     let year = req.params.annee;
//     let mounth = req.params.mois;
//     if (
//       isNaN(year) ||
//       year < 1900 ||
//       year > 2100 ||
//       isNaN(month) ||
//       month < 1 ||
//       month > 12
//     ) {
//       return res.status(400).json("Invalid year or month");
//     }
//     let statsDeleted = await Analytics.destroy({
//       where: { annee: year, mois: mounth },
//     });
//     res.json(`stats de  ${year}-${mounth} sont supprimée`);
//   } catch (error) {
//     res.status(500).json("Internal server error.");
//   }
// });

module.exports = router;
