import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";

export default function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    await axios.get("http://localhost:3001/analytics").then((response) => {
      setAnalytics(response.data);
    });
  };
  return (
    <div>
      <Header titre="Analytics" />
    </div>
  );
}
