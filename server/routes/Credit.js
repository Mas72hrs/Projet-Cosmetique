const express = require("express");
const router = express.Router();
const { Credit, CartItems, Analytics, User, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listeCredits = await Credit.findAll();
    res.json(listeCredits);
  } catch (error) {
    console.error("Error fetching Credits des clients :", error);
    res.status(500).json({ message: " Error fetching credits " });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const credit = await Credit.findOne({ where: { id: id } });
    res.json(credit);
  } catch (error) {
    console.error("Error getting credit :", error);
    res.status(500).json({ message: "Error Getting credit " });
  }
});

//Creation new cartItem

router.post("/", async (req, res) => {
  try {
    const { prixTotalCredit, UserId, client } = req.body;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const dateDeCredit = `${year}-${month}-${day}`;

    // No conflict, create the new Vente
    const credit = await Credit.create({
      date: dateDeCredit,
      prixTotalCredit: parseFloat(prixTotalCredit),
      UserId: UserId,
      client: client,
    });

    await CartItems.destroy({ where: {} });

    let analyticsExist = await Analytics.findOne({
      where: {
        annee: year,
        mois: month,
      },
    });

    if (!analyticsExist) {
      await Analytics.create({
        annee: year,
        mois: month,
        nbrVentes: 1,
        total: parseFloat(prixTotalCredit),
      });
      //update necessary userData
      const user = await User.findOne({ where: { id: UserId } });
      if (user) {
        await User.update(
          {
            sales_mois: 1,
            numTotalSales: user.sales_mois + 1,
            sales_value: prixTotalCredit,
          },
          { where: { id: UserId } }
        );
        return res.status(201).json({
          message:
            "Nouveu credit a été créée avec une nouvelle analytics table",
        });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    } else {
      const analytic = await Analytics.findOne({
        where: {
          annee: year,
          mois: month,
        },
      });
      if (analytic) {
        await Analytics.update(
          {
            nbrVentes: analytic.nbrVentes + 1,
            numTotalSales: analytic.numTotalSales + 1,
            total: analytic.total + parseFloat(prixTotalCredit),
          },
          { where: { id: analytic.id } }
        );
      }

      const user = await User.findOne({ where: { id: UserId } });
      if (user) {
        await User.update(
          {
            sales_mois: Sequelize.literal("sales_mois + 1"),
            numTotalSales: Sequelize.literal("numTotalSales + 1"),
            sales_value: user.sales_value + prixTotalCredit,
          },
          { where: { id: UserId } }
        );
        return res.status(201).json({
          message: "Nouvelle vente a été créée avec une mise a jour analytics ",
        });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    }

    res.status(200).json({ message: "Nouvelle credit a été créée" });
  } catch (error) {
    console.error("Error creating credit:", error);
    res.status(500).json({ message: "Error creating credit" });
  }
});
//modification de prix credit
router.patch("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { somme } = req.body;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const dateDeCredit = `${year}-${month}-${day}`;

    const credit = await Credit.findOne({ where: { id: id } });
    if (credit.prixTotalCredit < somme) {
      return res
        .status(404)
        .json({ message: "la somme de credit a payé est incorrecte" });
    } else {
      const creditupdated = await Credit.update(
        {
          prixTotalCredit: credit.prixTotalCredit - parseFloat(somme),
          date: dateDeCredit,
        },
        { where: { id: id } }
      );

      return res.json(creditupdated);
    }
  } catch (error) {
    console.error("Error updating Credit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Suppression credit
router.delete("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCredit = await Credit.destroy({
      where: { id: id },
    });

    if (deletedCredit === 0) {
      return res.status(404).json({ message: "Credit not found" });
    }

    res.json({ message: "Credit deleted successfully" });
  } catch (error) {
    console.error("Error deleting Credit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
