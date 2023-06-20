import React, { useState } from "react";
import "./SearchBar.css";
import search from "../Icons/search-icon.png";
import addproduct from "../Icons/add-product.png";
import AddProductForm from "../Products/AddProductForm";
import Modal from "react-modal";

export default function SearchBar() {
  const [isForm, setisForm] = useState(false);


  return (
    <div className="Header--container">
      <div className="Header--Search--container">
        <img src={search} alt="search-icon" />
        <input
          placeholder="Rechercher Produit"
          className="outfit"
        />
      </div>

      <button className="ajouter-produit-btn outfit" onClick={() => setisForm(true)}>
        Ajouter Produit <img src={addproduct} alt="ajouter-produit"/>
      </button>


      <Modal isOpen={isForm} className="add-product-form-modal" onRequestClose={() => setisForm(false)}   >
        <AddProductForm />
      </Modal>
    </div>
  );
}
