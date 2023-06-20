import React, { useState, useEffect } from "react";
import "./AddProductForm.css";
import axios from "axios";

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategorieId, setSelectedCategorieId] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/categorie`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred in the promise chain
        console.error("An error occurred:", error);
      });
  }, []);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    codeBar: 0,
    nomProduit: "",
    quantite: 1,
    prix_A: 0,
    prix_V: 0,
    CategorieId: parseInt(selectedCategorieId),
    DExp: date
      ? date.toLocaleDateString().split("/").reverse().join("-")
      : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategorieId(selectedId);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      CategorieId: selectedCategorieId,
      DExp: date
        ? date.toLocaleDateString().split("/").reverse().join("-")
        : null,
    }));
  }, [date, selectedCategorieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic with formData
    console.log(formData);
  };

  const handleCancel = () => {
    // Handle cancellation logic here
    setFormData({
      codeBar: 0,
      nomProduit: "",
      quantite: 1,
      prix_A: "",
      prix_V: "",
      CategorieId: "",
      DExp: "",
    });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:3001/produit", {
        codeBar: formData.codeBar,
        nomProduit: formData.nomProduit,
        quantite: parseInt(formData.quantite),
        prix_A: parseFloat(formData.prix_A),
        prix_V: parseFloat(formData.prix_V),
        CategorieId: parseInt(formData.CategorieId),
        DExp: formData.DExp,
      });
      console.log(response.data);
      window.location.reload();
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.error("Error adding new product", error);
      // Handle the error
    }
  };

  return (

    
    <form className="add-product-form outfit" onSubmit={handleSubmit}>
      <h1>Ajout de Produit </h1>

      <label>
        Code Bar :
        <input
          type="numbrer"
          name="codeBar"
          value={formData.codeBar}
          onChange={handleChange}
        />
      </label>
      <label>
        Nom du Produit:
        <input
          type="text"
          name="nomProduit"
          value={formData.nomProduit}
          onChange={handleChange}
        />
      </label>

      <label>
        Quantité :
        <input
          type="number"
          name="quantite"
          value={formData.quantite}
          onChange={handleChange}
        />
      </label>

      <label>
        Prix Achat :
        <input
          type="number"
          name="prix_A"
          value={formData.prix_A}
          onChange={handleChange}
        />
      </label>

      <label>
        Prix Vente:
        <input
          type="number"
          name="prix_V"
          value={formData.prix_V}
          onChange={handleChange}
        />
      </label>

      <label>
        Catégorie :
        <select
          name="CategorieId"
          value={selectedCategorieId}
          onChange={handleSelectChange}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.nomCategorie}
              </option>
            );
          })}
        </select>
      </label>

      <label>
        Date d'Expiration :
        <input
          type="date"
          name="DExp"
          value={formData.DExp}
          onChange={handleChange}
        />
      </label>

      <button type="submit" onClick={handleAddProduct}>
        Ajouter
      </button>
      <button type="button" onClick={handleCancel}>
        Annuler
      </button>
    </form>
  );
}
