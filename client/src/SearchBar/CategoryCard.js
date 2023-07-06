import React from "react";
import trash from "../Icons/trash.png";
import "./CategoryCard.css";
import axios from "axios";

export default function CategoryCard(props) {
  const { id, fetchCategories } = props;

  const deleteCategorie = (categorieID) => {
    axios
      .delete(`http://localhost:3001/categorie/byId/${categorieID}`)
      .then(() => {
        // After deleting the product, fetch the updated list of products
        fetchCategories();
      })
      .catch((error) => {
        console.log("Error deleting Credit:", error);
      });
  };

  return (
    <div className="category-container">
      <p>{props.nomCat}</p>
      <button
        className="supprimer-produit-btn"
        style={{ height: "40px", width: "40px" }}
        onClick={() => deleteCategorie(id)}
      >
        <img src={trash} alt="edit" />
      </button>
    </div>
  );
}
