import React from "react";
import "./AnalyticsCard.css";

export default function AnalyticsCard(props) {
  return (
    <div className="analytics-card-container">
      <h1>{props.name}</h1>
      <img src={props.icon} alt="icon" style={{margin:"10px 0"}}/>


      <div className="details">
        {
          props.name === "Stockage" && 
          <>
          <p>Nombres Produits Enregistrés : {props.nbrProduit} </p>
          <p>Nombres Produits Out of Stock : {props.nbrProduitOutStock} </p>
          </>
        }
       
        {
          props.name === "Vents" && 
          <>
        <p>Nombre de Vente Ans : {props.nbrVentesAns} </p>
        <p>nbrVentesGen : {props.nbrVentesGen} </p>
        <p>totalArgentAns : {props.totalArgentAns} </p>
        <p>totalProfitAns : {props.totalProfitAns} </p>
          </>
        }

{
          props.name === "Crédit" && 
          <>
          <p>Nombre de Crédit Totale : {props.nbrCreditsTotal} </p>
          <p>Somme Totale : {props.sommeCredits} </p>
          </>
        }

        

      </div>


    </div>
  );
}
