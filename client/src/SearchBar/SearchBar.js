import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import search from "../Icons/search-icon.png";
import addproduct from "../Icons/add-product.png";
import AddProductForm from "../Products/AddProductForm";
import Modal from "react-modal";
import category from "../Icons/icons8-categorize-96.png";
import CategoryCard from "./CategoryCard";
import done from "../Icons/done.png";


export default function SearchBar({ onFilter }) {
  let inputSearch = useRef(null);
  useEffect(() => {
    inputSearch.current.focus();
  });

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onFilter(searchTerm);
  };
  const [isForm, setisForm] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  return (
    <div className="Header--container">
      <div className="Header--Search--container">
        <img src={search} alt="search-icon" />
        <input
          placeholder="Rechercher Produit"
          className="outfit"
          ref={inputSearch}
          onChange={handleSearch}
        />
      </div>
      
      <div className="btns-search"> 
      <button
        className="ajouter-produit-btn outfit"
        onClick={() => setAddCategory(true)}
      >
        Ajouter Catégorie <img src={category} alt="ajouter-produit" />
      </button>


      <button
        className="ajouter-produit-btn outfit"
        onClick={() => setisForm(true)}
      >
        Ajouter Produit <img src={addproduct} alt="ajouter-produit" />
      </button>

      </div>


      <Modal
        isOpen={isForm}
        className="add-product-form-modal"
        onRequestClose={() => setisForm(false)}
      >
        <AddProductForm />
      </Modal>


      <Modal
        isOpen={addCategory}
        className="add-product-form-modal outfit height-vh"
        onRequestClose={() => setAddCategory(false)}
        
      >
        <h1 style={{textAlign:"center",marginBottom:"30px"}}>Les Catégories</h1>
        <div className="add-code" style={{backgroundColor:"#bfbfbf",width:"98%"}}>
              <input
                placeholder="Ajouter Catégorie ..."
                type="text"
              />
              <button>
                <img
                  src={done}
                  alt="done"
                />
              </button>
            </div>
        <div className="category-list">
          <CategoryCard nomCat="Prfums" />
          <CategoryCard nomCat="Journals" />
          <CategoryCard nomCat="Cigarette" />
          <CategoryCard nomCat="Chemma" />
        </div>
      </Modal>
    </div>
  );
}
