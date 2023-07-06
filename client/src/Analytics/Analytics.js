import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import AnalyticsCard from "./AnalyticsCard";
import  "./Analytics.css";
import LineChart from "../Products/LineChart";

export default function Analytics() {
  const [analytics, setAnalytics] = useState();
  
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:3001/analytics/AllDataHere");
      setAnalytics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 

  const data = analytics.length > 0
    ? {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: analytics.map(entry => entry.profit_mois),
            backgroundColor: 'black',
            borderColor: 'purple',
            borderWidth: 1,
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
  };
  return (
    <div>
      <Header titre="Analytics" />
      <div className="analytics-container">
        <div className="all-cards">
          <AnalyticsCard name="Stockage" value="12"/>
          <AnalyticsCard name="Produits" value="55"/>
          <AnalyticsCard name="Profit" value="1500" />
          <AnalyticsCard name="Crédits" value="3" />
        </div>

        <div className="charts">
  
        <LineChart data={data} options={options}/>
        </div>

      </div>
    </div>
  );
}
