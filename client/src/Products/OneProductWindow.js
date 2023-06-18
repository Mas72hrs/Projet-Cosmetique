import React from "react";
import Header from "../Header/Header.js";
import { useParams } from "react-router-dom";
import "./OneProductWindow.css";
import LineChart from "./LineChart.js";
import { useLocation } from "react-router-dom";

export default function OneProductWindow() {
  const location = useLocation();
  const { productName } = useParams();
  const productDetails = location.state;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 150, 200, 180, 250, 200],
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="OneProductWindow-container">
      <Header titre={productName} />
      <div className="product-details-container">
        <h1 style={{textAlign:"center"}}>Détails de Produit</h1>
        <div className="one-row" >
          <div className="one-input">
            <label>Nom de Produit : </label>
            <p>{productDetails.nom}</p>
          </div>

          <div className="one-input">
            <label>Quantité :</label>
            <p>{productDetails.quantite} unités</p>
          </div>
        </div>

        <div className="one-row">
          <div className="one-input">
            <label>Prix Acheté :</label>
            <p>{productDetails.prixAchete} da</p>
          
          </div>

          <div className="one-input">
            <label>Prix Vendue :</label>
            <p>{productDetails.prixVendue} da</p>   
          </div>
        </div>
        <div className="product-chart">
        <LineChart data={data} options={options}/>
        </div>
      </div>
    </div>
  );
}
