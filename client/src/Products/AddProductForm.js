import React, { useState } from 'react';
import './AddProductForm.css';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    nomProduit: '',
    marque: '',
    quantite: '',
    description: '',
    prix_A: '',
    prix_V: '',
    CategorieId: '',
    DExp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic with formData
    console.log(formData);
  };

  const handleCancel = () => {
    // Handle cancellation logic here
    setFormData({
      nomProduit: '',
      marque: '',
      quantite: '',
      description: '',
      prix_A: '',
      prix_V: '',
      CategorieId: '',
      DExp: '',
    });
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
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
        Marque:
        <input
          type="text"
          name="marque"
          value={formData.marque}
          onChange={handleChange}
        />
      </label>

      <label>
        Quantité:
        <input
          type="text"
          name="quantite"
          value={formData.quantite}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Prix Achat:
        <input
          type="text"
          name="prix_A"
          value={formData.prix_A}
          onChange={handleChange}
        />
      </label>

      <label>
        Prix Vente:
        <input
          type="text"
          name="prix_V"
          value={formData.prix_V}
          onChange={handleChange}
        />
      </label>

      <label>
        Catégorie:
        <select
          name="CategorieId"
          value={formData.CategorieId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </label>

      <label>
        Date d'Expiration:
        <input
          type="date"
          name="DExp"
          value={formData.DExp}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
