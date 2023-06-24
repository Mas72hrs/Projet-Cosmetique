import React, { useState, useEffect } from "react";
import "./ProductWithoutCode.css";
import axios from "axios";

export default function ProductWithoutCode(props) {
  const { onFetch } = props;

  const handleAddToCart = () => {
    try {
      axios
        .post("http://localhost:3001/cart", {
          productId: props.idProduit,
        })
        .then(() => {
          // After deleting the product, fetch the updated list of products
          onFetch();
        });
    } catch (error) {
      console.error("Error adding new product", error);
      // Handle the error
    }
  };

  return (
    <div className="produits-sans-code-container">
      <div className="details">
        <h1>{props.nom}</h1>
        <p>Quantité : {props.quantite}</p>
      </div>

      <button className="add-to-cart" onClick={handleAddToCart}>
        Ajouter
      </button>
    </div>
  );
}
