import React, { useState } from "react";
import "./ProductCard.css";
import trash from "../Icons/trash.png";
import seemore from "../Icons/see-more.png";
import edit from "../Icons/edit.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductCard(props) {
  const { fetchFunction } = props;

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3001/produit/byId/${productId}`)
      .then(() => {
        // After deleting the product, fetch the updated list of products
        fetchFunction();
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };

  return (
    <div className="productcard-container">
      <div style={{ textAlign: "center" }}>
        <h1>{props.nom}</h1>
        <p>Quantite : {props.quantite}</p>
        <p>Prix Acheté : {props.prixAchete} da</p>
        <p>Prix Vendu : {props.prixVendue} da</p>
      </div>
      <div className="productsCard-buttons">
        <button className="modifier-produit-btn">
          <img src={edit} alt="trash" />
        </button>
        <Link
          to={`/inpage/produits/${encodeURIComponent(props.nom)}`}
          state={props}
        >
          <button className="voir-plus-produit-btn">
            <img
              src={seemore}
              alt="seemore"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
        </Link>
        <button className="supprimer-produit-btn">
          <img
            src={trash}
            alt="edit"
            onClick={(e) => {
              deleteProduct(props.idProduit);
            }}
          />
        </button>
      </div>
    </div>
  );
}
