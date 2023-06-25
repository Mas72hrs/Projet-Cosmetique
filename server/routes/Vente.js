const express = require("express");
const router = express.Router();
const { Vente, CartItems } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listeVentes = await Vente.findAll();
    res.json(listeVentes);
  } catch (error) {
    console.error("Error fetching ventes :", error);
    res.status(500).json({ message: " Error fetching ventes " });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const vente = await Vente.findOne({ where: { id: id } });
    res.json(vente);
  } catch (error) {
    console.error("Error getting vente :", error);
    res.status(500).json({ message: "Error Getting vente " });
  }
});

//Creation new cartItem

router.post("/", async (req, res) => {
  try {
    const { price, items, UserId } = req.body;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const dateDeVente = `${year}-${month}-${day}`;

    // No conflict, create the new Vente
    const vente = await Vente.create({
      date: dateDeVente,
      prixTotal: parseFloat(price),
      UserId: UserId,
    });

    // Generate list of items bought with quantity
    //   const itemsBought = {};
    //   items.forEach((item) => {
    //     const { name, quantity } = item;
    //     if (itemsBought[name]) {
    //       itemsBought[name] += quantity;
    //     } else {
    //       itemsBought[name] = quantity;
    //     }
    //   });

    //   // Store the items bought as text in the database field
    //   const itemsBoughtText = JSON.stringify(itemsBought);
    //   vente.itemsBought = itemsBoughtText;
    //   await vente.save();

    // Delete all records from CartItems table
    await CartItems.destroy({ where: {} });

    res.status(200).json({ message: "Nouvelle vente a été créée" });
  } catch (error) {
    console.error("Error creating vente:", error);
    res.status(500).json({ message: "Error creating vente" });
  }
});
//Suppression categorie
router.delete("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVente = await Vente.destroy({
      where: { id: id },
    });

    if (deletedVente === 0) {
      return res.status(404).json({ message: "Vente not found" });
    }

    res.json({ message: "Vente deleted successfully" });
  } catch (error) {
    console.error("Error deleting Vente:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
