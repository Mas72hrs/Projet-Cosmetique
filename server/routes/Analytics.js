const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const { Analytics, Vente, Produit, Credit } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const Allanalytics = await Analytics.findAll();
  res.json(Allanalytics);
});

router.get("/AllDataHere", async (req, res) => {
  try {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDay();

    // Fetch analytics for the current year
    let analyticsThisYear = await Analytics.findAll({
      where: {
        annee: currentYear,
      },
      order: [["mois", "ASC"]], // Order by mois field in ascending order
    });

    // Fetch analytics for the current month
    let analyticsThisMonth = await Analytics.findAll({
      where: {
        annee: currentYear,
        mois: currentMonth,
      },
    });

    // Fetch the count of reservations with etat = "walkIn"
    let nbrVentesAns = await Analytics.sum("nbrVentes", {
      where: {
        annee: currentYear,
      },
    });
    let nbrVentesGen = await Analytics.sum("nbrVentes");

    let totalArgentAns = await Analytics.sum("total");
    let totalProfitAns = await Analytics.sum("profit_mois");

    // total des produits

    let nbrProduits = await Produit.count();

    let depensesProduits = await Produit.sum("prix_A");
    // nombre de credits

    let nbrCreditsTotal = await Credit.count();

    const allData = {
      analyticsThisYear: analyticsThisYear,
      analyticsThisMonth: analyticsThisMonth,
      nbrVentesAns: nbrVentesAns,
      nbrVentesGeneral: nbrVentesGen,
      totalArgentParAns: totalArgentAns,
      totalProfitParAns: totalProfitAns,
      nbrProduits: nbrProduits,
      sommeDesPrixDachat: depensesProduits,
      nbrCreditsTotal: nbrCreditsTotal,
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
