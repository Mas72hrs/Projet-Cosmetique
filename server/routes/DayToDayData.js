const express = require("express");
const router = express.Router();
const { DayToDayData, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  try {
    const todayData = await DayToDayData.findOne();
    res.json(todayData);
  } catch (error) {
    console.error("Error fetching todayData :", error);
    res.status(500).json({ message: " Error fetching todayData " });
  }
});

//Creation new cartItem

router.post("/", async (req, res) => {
  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const dateToDay = `${year}-${month}-${day}`;

    const todayData = await DayToDayData.findOne();
    if (!todayData) {
      const newData = await DayToDayData.create({
        dateToDay: dateToDay,
      });
      return res.status(201).json({
        message: "Nouveu data date a été crée",
      });
    } else {
      const todayUpdated = await DayToDayData.update(
        {
          nbrVentesDay: todayData.nbrVentesDay + 1,
          dateToDay: dateToDay,
        },
        { where: { id: todayData.id } }
      );
      return res.status(201).json({
        message: "todayData updated cuz it already exists",
      });
    }
  } catch (error) {
    console.error("Error creating new todayData:", error);
    res.status(500).json({ message: "Error creating credit" });
  }
});

module.exports = router;
