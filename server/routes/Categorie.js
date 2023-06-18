const express = require("express");
const router = express.Router();
const { Categorie } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listeCategories = await Categorie.findAll();
    res.json(listeCategories);
  } catch (error) {
    console.error("Error getting categories :", error);
    res.status(500).json({ message: "Error Getting all categories " });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Categorie = await Categorie.findOne({ where: { id: id } });
    res.json(Categorie);
  } catch (error) {
    console.error("Error getting categories :", error);
    res.status(500).json({ message: "Error Getting all categories " });
  }
});

//Creation Categorie

router.post("/", async (req, res) => {
  try {
    const newCategorie = req.body.nomCategorie;
    const newCatName = newCategorie.toString();
    // Check if the Categorie with the same name already exists
    const existingCatt = await Categorie.findOne({
      where: {
        nomCategorie: newCatName,
      },
    });

    if (existingCatt) {
      // Categorie with the same name already exists
      return res.status(409).json({ message: "Categorie already exists" });
    }

    // No conflict, create the new Categorie
    const createdCat = await Categorie.create({
      nomCategorie: newCatName,
    });

    res.status(200).json({ message: "nouvelle Categorie a ete cree" });
  } catch (error) {
    console.error("Error creating categorie:", error);
    res.status(500).json({ message: "Error creating categorie" });
  }
});
//Suppression categorie
router.delete("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCat = await Categorie.destroy({
      where: { id: id },
    });

    if (deletedCat === 0) {
      return res.status(404).json({ message: "Categorie not found" });
    }

    res.json({ message: "Categorie deleted successfully" });
  } catch (error) {
    console.error("Error deleting Categorie:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
