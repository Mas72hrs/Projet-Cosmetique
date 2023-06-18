import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Sell from "../Sell/Sell";
import Products from "../Products/Products";
import OneProductWindow from "../Products/OneProductWindow";
import Historic from "../Historic/Historic";
import Analytics from "../Analytics/Analytics";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function InPage() {
  const userData = JSON.parse(localStorage.getItem("accessToken"));

  const [userIn, setUserIn] = useState([]);

  const { productName } = useParams();

  // useEffect(() => {
  //   axios.get(`http://localhost:3001/auth/${userData.id}`).then((response) => {
  //     setUserIn(response.data);
  //   });
  // }, []);

  return (
    <div
      className="inpage--container"
      style={{ display: "grid", gridTemplateColumns: "20% 80%" }}
    >
      <div>
        {/* nom={userIn.username} */}
        <Navbar nom={userData.username} />
      </div>
      <div style={{ padding: "0 0px 0 40px" }}>
        <Routes>
          <Route path="/vendre" element={<Sell />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/historique" element={<Historic />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/produits/:productName" element={<OneProductWindow />} />
        </Routes>
      </div>
    </div>
  );
}
