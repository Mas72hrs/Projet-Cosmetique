const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfusers = await User.findAll();
    res.json(listOfusers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the list of users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password, nom, prenom, sexe, telephone, role } = req.body;

    // Vérification des champs obligatoires
    if (!username || !password || !nom || !prenom || !telephone) {
      console.log("Veuillez fournir tous les champs obligatoires");
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
      });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password hashed");

    // Création de l'employé
    const user = await User.create({
      username: username,
      password: hashedPassword,
      nom: nom,
      prenom: prenom,
      sexe: sexe,
      telephone: telephone,
      role: role,
    });
    console.log("user Ajouté étape 1");
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'ajout de l'employée",
      details: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User Doesn't exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Wrong username and password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    return res.json({
      token: accessToken,
      username: user.username,
      id: user.id,
      role: user.role,
    });
  });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  // Posts.findByPk(id)
  res.json(user);
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
