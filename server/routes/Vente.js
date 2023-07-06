const express = require("express");
const router = express.Router();
const {
  Vente,
  CartItems,
  Analytics,
  User,
  Sequelize,
  Produit,
} = require("../models");

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

    const productsString = Object.entries(items)
      .map(([productName, quantity]) => `${productName}: ${quantity}`)
      .join(", ");

    // No conflict, create the new Vente
    const vente = await Vente.create({
      date: dateDeVente,
      prixTotal: parseFloat(price),
      productsBought: productsString,
      UserId: UserId,
    });

    // Convert items object into an array of [productName, quantity]
    const itemsArray = Object.entries(items);

    // Decrease stock quantities for each item purchased
    for (const [productName, quantity] of itemsArray) {
      // Find product by name
      const product = await Produit.findOne({
        where: { nomProduit: productName },
      });

      if (!product) {
        console.error(`Product '${productName}' not found.`);
        continue; // Move to the next item if product not found
      }

      // Update stock quantity
      if (product.quantite < quantity) {
        return res.status(401).json({
          message: "erreur de quantite",
        });
      } else {
        const updatedQuantity = product.quantite - quantity;
        await Produit.update(
          { quantite: updatedQuantity },
          { where: { id: product.id } }
        );
      }
    }

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
        total: parseFloat(price),
      });
      //update necessary userData
      const user = await User.findOne({ where: { id: UserId } });
      if (user) {
        await User.update(
          {
            sales_mois: 1,
            numTotalSales: user.sales_mois + 1,
            sales_value: price,
          },
          { where: { id: UserId } }
        );
        return res.status(201).json({
          message:
            "Nouvelle vente a été créée avec une nouvelle analytics table",
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
            total: analytic.total + parseFloat(price),
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
            sales_value: user.sales_value + price,
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
