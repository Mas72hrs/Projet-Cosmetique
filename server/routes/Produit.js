const express = require("express");
const router = express.Router();
const { Produit } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const listeProduits = await Produit.findAll();
    res.json(listeProduits);
  } catch (error) {
    console.error("Error getting Products :", error);
    res.status(500).json({ message: "Error Getting all Products " });
  }
});

router.get("/null-codebar", async (req, res) => {
  try {
    const products = await Produit.findAll({
      where: {
        codeBar: null,
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error getting Products :", error);
    res.status(500).json({ message: "Error Getting all Products " });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produit = await Produit.findOne({ where: { id: id } });
    res.json(produit);
  } catch (error) {
    console.error("Error getting this specific product :", error);
    res.status(500).json({ message: "Error Getting this product " });
  }
});

router.get("/searchProduct", async (req, res) => {
  try {
    const term = req.query.term;

    const productsAfterSearch = await Produit.findAll({
      where: {
        nomProduit: {
          [Op.like]: `${term}%`,
        },
      },
      limit: 3,
    });
    res.json(productsAfterSearch);
  } catch (error) {
    console.error("Error getting this specific product :", error);
    res.status(500).json({ message: "Error Getting this product " });
  }
});

//Creation Categorie

router.post("/", async (req, res) => {
  try {
    const { codeBar, nomProduit, quantite, prix_A, prix_V, DExp, CategorieId } =
      req.body;

    // Vérification des champs obligatoires
    if (!nomProduit || !quantite || !prix_A || !prix_V) {
      console.log("Veuillez fournir tous les champs obligatoires");
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
      });
    }

    if (codeBar === 0 || codeBar === "") {
      const produit = await Produit.create({
        nomProduit: nomProduit,
        quantite: quantite,
        prix_A: prix_A,
        prix_V: prix_V,
        DExp: DExp,
        CategorieId: CategorieId,
      });

      return res.status(201).json(produit);
    } else {
      const produit = await Produit.create({
        codeBar: codeBar,
        nomProduit: nomProduit,
        quantite: quantite,
        prix_A: prix_A,
        prix_V: prix_V,
        DExp: DExp,
        CategorieId: CategorieId,
      });

      return res.status(201).json(produit);
    }

    // const existingCatt = await Produit.findOne({
    //   where: {
    //     nomCategorie: newCatName,
    //   },
    // });

    // if (existingCatt) {
    //   // Categorie with the same name already exists
    //   return res.status(409).json({ message: "Categorie already exists" });
    // }

    // Création de l'employé
  } catch (error) {
    console.error("Error creating Produit:", error);
    res.status(500).json({ message: "Error creating Produit" });
  }
});
//Suppression categorie
router.delete("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Produit.destroy({
      where: { id: id },
    });

    if (deletedProduct === 0) {
      return res.status(404).json({ message: "Produit not found" });
    }

    res.json({ message: "Produit deleted successfully" });
  } catch (error) {
    console.error("Error deleting Produit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
