import React, { useState } from 'react'
import "./HistoricCard.css"
import arrow from "../Icons/arrow.png";

export default function HistoricCard(props) {

  const [rotate, setRotate] = useState(false);

  const toggleFunctions = () => {
    setRotate(!rotate);
  };


  return (
    <div className='historic--card--container'>
       <div>
        <h1>Vent ID</h1>
        <p>{props.id}</p>
       </div>

       <div>
        <h1>Prix Totale</h1>
        <p>{props.prix_totale} da</p>
       </div>


      <button
            className="voir-ventes-btn"
            style={{ backgroundColor: "rgb(37, 37, 37)" }}
            onClick={() => toggleFunctions()}
          >
            <img
              src={arrow}
              alt="show-sales"
              style={{ transform: rotate ? "rotate(270deg)" : "rotate(90deg)"}}
            />
       </button>



    </div>
  )
}
