import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import Header from "../Header/Header";
import "./Products.css";
import { ProductsData } from "./ProductsData.js";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:3001/produit").then((response) => {
      setProducts(response.data);
    });
  };

  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:3001/produit/byId/${productId}`).then(() => {
      // After deleting the product, fetch the updated list of products
      fetchProducts();
    });
  };
  const ProductsList = products.map((produit) => {
    return (
      <ProductCard
        key={produit.id}
        idProduit={produit.id}
        idCategory={produit.CategorieId}
        nom={produit.nomProduit}
        quantite={produit.quantite}
        prixAchete={produit.prix_A}
        prixVendue={produit.prix_V}
        codeBar={produit.codeBar}
        onDeleteProduct={deleteProduct}
      />
    );
  });

  return (
    <div style={{ marginRight: "40px" }}>
      <Header titre="Produits" />
      <SearchBar />
      <div className="products-container-grid">{ProductsList}</div>
    </div>
  );
}
