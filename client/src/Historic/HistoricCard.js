import React, { useState } from "react";
import "./HistoricCard.css";
import arrow from "../Icons/arrow.png";

export default function HistoricCard(props) {
  const [rotate, setRotate] = useState(false);

  const toggleFunctions = () => {
    setRotate(!rotate);
  };

  return (
    <div className="historic--card--container">
      <div>
        <h1>Vent ID</h1>
        <p>{props.id}</p>
      </div>

      <div>
        <h1>Prix Totale</h1>
        <p>{props.prix_totale} da</p>
      </div>
      <div>
        <h1>Poducts Bought</h1>
        <div style={{width:"200px"}}>
        <p>{props.productsBought}</p>
        </div>

      </div>


    </div>
  );
}
