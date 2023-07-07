import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import AnalyticsCard from "./AnalyticsCard";
import "./Analytics.css";
import LineChart from "../Products/LineChart";
import proudctIcon from "../Icons/icons8-products-94.png";
import money from "../Icons/icons8-sales-performance-94.png";
import credit from "../Icons/icons8-money-transfer-94.png";
import arrow from "../Icons/icons8-arrow-100.png";

export default function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const [year, setYear] = useState(currentYear || 2023);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/analytics/AllDataHere"
      );
      setAnalytics(response.data);
      //setDataMonth(response.data.analyticsThisYear);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataYear = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/analytics/byyear/${year}`
      );

      setDataMonth(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataYear(year);
  }, [year]);

  const data =
    // analytics?.length > 0
    //   ?
    {
      labels: [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aou",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales",
          data: dataMonth.map((entry) => {
            return entry.profit_mois || 0;
          }),
          backgroundColor: "black",
          borderColor: "purple",
          borderWidth: 1,
        },
      ],
    };

  const creditData = analytics.creditData || [];
  const creditArray = Object.entries(creditData);

  const produitData = analytics.produitData || [];
  const venteData = analytics.venteData || [];

  const options = {
    responsive: true,
  };

  const handleYearUp = () => {
    setYear((prevYear) => prevYear + 1);
  };

  const handleYearDown = () => {
    if (year > 2023) {
      setYear((prevYear) => prevYear - 1);
    }
  };
  return (
    <div>
      <Header titre="Analytics" />
      <div className="analytics-container" style={{ paddingRight: "40px" }}>
        <div className="all-cards">
          <AnalyticsCard
            name="Stockage"
            icon={proudctIcon}
            nbrProduit={produitData.nbrProduit}
            nbrProduitOutStock={produitData.nbrProduitOutStock}
          />
          <AnalyticsCard
            name="Vents"
            icon={money}
            nbrVentesAns={venteData.nbrVentesAns}
            nbrVentesGen={venteData.nbrVentesGen}
            totalArgentAns={venteData.totalArgentAns}
            totalProfitAns={venteData.totalProfitAns}
          />
          <AnalyticsCard
            name="Crédit"
            icon={credit}
            nbrCreditsTotal={creditData.nbrCreditsTotal}
            sommeCredits={creditData.sommeCredits}
          />
          <AnalyticsCard
            name="Crédits"
            value={creditArray[0] || "error loading"}
          />
        </div>

        <div className="charts">
          <LineChart data={data} options={options} />
        </div>

        <div className="year-navigator">
          <button onClick={handleYearDown}>
            <img src={arrow} alt="arrow" />
          </button>
          <h1> {year} </h1>
          <button onClick={handleYearUp}>
            <img
              src={arrow}
              alt="arrow"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
