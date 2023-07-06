import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import search from "../Icons/search-icon.png";
import addproduct from "../Icons/add-product.png";
import AddProductForm from "../Products/AddProductForm";
import Modal from "react-modal";
import category from "../Icons/icons8-categorize-96.png";
import CategoryCard from "./CategoryCard";
import done from "../Icons/done.png";
import axios from "axios";

export default function SearchBar({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await axios.get("http://localhost:3001/categorie").then((response) => {
      setCategories(response.data);
    });
  };
  let inputSearch = useRef(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onFilter(searchTerm);
  };
  const [isForm, setisForm] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const handleAddCategorie = async () => {
    try {
      const response = await axios.post("http://localhost:3001/categorie", {
        nomCategorie: nomCategorie,
      });
      console.log(response.data);
      fetchCategories();
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.error("Error adding new product", error);
      // Handle the error
    }
  };

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
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Les Catégories
        </h1>
        <div
          className="add-code"
          style={{ backgroundColor: "#bfbfbf", width: "98%" }}
        >
          <input
            placeholder="Ajouter Catégorie ..."
            type="text"
            value={nomCategorie}
            onChange={(e) => {
              setNomCategorie(e.target.value);
            }}
          />
          <button
            onClick={handleAddCategorie}
            disabled={nomCategorie.length <= 2}
          >
            <img src={done} alt="done" />
          </button>
        </div>
        <div className="category-list">
          {categories.map((categorie) => {
            return (
              <div key={categorie.id}>
                <CategoryCard
                  nomCat={categorie.nomCategorie}
                  id={categorie.id}
                  fetchCategories={fetchCategories}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
