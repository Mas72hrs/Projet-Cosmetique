const express = require("express");
const router = express.Router();
const { Credit, CartItems } = require("../models");

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

    res.status(200).json({ message: "Nouvelle credit a été créée" });
  } catch (error) {
    console.error("Error creating credit:", error);
    res.status(500).json({ message: "Error creating credit" });
  }
});
//Suppression categorie
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
