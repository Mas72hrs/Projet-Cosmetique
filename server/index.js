const express = require("express");

const db = require("./models");
//const User = require("./User");

const cors = require("cors");
const app = express();
// parsing the requests
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//Routes
const usersRouter = require("./routes/User");
app.use("/auth", usersRouter);

const categorieRouter = require("./routes/Categorie");
app.use("/categorie", categorieRouter);

const produitRouter = require("./routes/Produit");
app.use("/produit", produitRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("the server is running hmdlh 👌");
  });
});
