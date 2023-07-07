const express = require("express");
const router = express.Router();
const { CartItems, Produit } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listeCartItems = await CartItems.findAll();
    res.json(listeCartItems);
  } catch (error) {
    console.error("Error getting cart items :", error);
    res.status(500).json({ message: "Error Getting all cartItems " });
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cartItems = await CartItems.findOne({ where: { id: id } });
    res.json(cartItems);
  } catch (error) {
    console.error("Error getting cartItem :", error);
    res.status(500).json({ message: "Error Getting all cartItems " });
  }
});

//Creation new cartItem

router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;

    const produit = await Produit.findOne({ where: { id: productId } });

    // No conflict, create the new Categorie
    const createdNewItem = await CartItems.create({
      ProduitId: productId,
      nomProduit: produit.nomProduit,
      itemPrice: produit.prix_V,
      totalPrice: produit.prix_V,
    });

    res.status(200).json({ message: "nouveau item est cree" });
  } catch (error) {
    console.error("Error creating newItem:", error);
    res.status(500).json({ message: "Error creating newItem" });
  }
});
//add new item to the cart based on nomProduit
router.post("/nomproduit", async (req, res) => {
  try {
    const { nomProduit } = req.body;

    const produit = await Produit.findOne({
      where: { nomProduit: nomProduit },
    });

    if (produit) {
      const createdNewItem = await CartItems.create({
        ProduitId: produit.id,
        nomProduit: produit.nomProduit,
        itemPrice: produit.prix_V,
        totalPrice: produit.prix_V,
      });
      return res.status(200).json({ message: "nouveau item est cree" });
    } else {
      return res.status(400).json({ message: "produit non trouvé" });
    }
  } catch (error) {
    console.error("Error creating newItem:", error);
    res.status(500).json({ message: "Error creating newItem" });
  }
});
//Suppression categorie
router.delete("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await CartItems.destroy({
      where: { id: id },
    });

    if (deletedItem === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cartItem:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/TotalPrice/:idItem", async (req, res) => {
  try {
    const id = req.params.idItem;
    const { Qte, idProduit } = req.body;

    const produitInfo = await Produit.findOne({ where: { id: idProduit } });
    if (!produitInfo || Qte > produitInfo.quantite) {
      return res
        .status(400)
        .json("la quantite de produit acheté est invalide.");
    } else {
      // if (produitInfo) {
      //   if (Qte > produitInfo.quantite) {
      //     return res
      //       .status(400)
      //       .json("la quantite de produit acheté est invalide.");
      //   }
      // }
      await CartItems.update(
        {
          Quantity: Qte,
        },
        { where: { id: id } }
      );

      const updatedCartItems = await CartItems.findOne({ where: { id: id } });

      const totalPrice = updatedCartItems.Quantity * updatedCartItems.itemPrice;

      await CartItems.update(
        {
          totalPrice: totalPrice,
        },
        { where: { id: id } }
      );

      return res.json(`prix Total updated `);
    }
  } catch (error) {
    console.error("Error lors de la modification de prix Total", error);
    return res.status(500).json("Error modifying Total Price.");
  }
});

module.exports = router;
