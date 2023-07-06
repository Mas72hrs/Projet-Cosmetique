import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import AnalyticsCard from "./AnalyticsCard";
import  "./Analytics.css";

export default function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    await axios
      .get("http://localhost:3001/analytics/AllDataHere")
      .then((response) => {
        setAnalytics(response.data);
      });
  };
  return (
    <div>
      <Header titre="Analytics" />
      <div className="analytics-container">
        <div className="all-cards">
          <AnalyticsCard />
          <AnalyticsCard />
          <AnalyticsCard />
          <AnalyticsCard />
        </div>

        <div className="charts">
          charts

        </div>

      </div>
    </div>
  );
}
