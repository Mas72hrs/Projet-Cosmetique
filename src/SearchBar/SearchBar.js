import React from "react";
import "./SearchBar.css";
import search from "../Icons/search-icon.png";
import addproduct from "../Icons/add-product.png";

export default function SearchBar() {



  return (
    <div className="Header--container">
      <div className="Header--Search--container">
        <img src={search} alt="search-icon" />
        <input
          placeholder="Rechercher Produit"
          className="outfit"
        />
      </div>

      <button className="ajouter-produit-btn outfit">
        Ajouter Produit <img src={addproduct} alt="ajouter-produit"/>
      </button>
    </div>
  );
}
