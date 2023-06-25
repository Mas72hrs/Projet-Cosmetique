import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import Header from "../Header/Header";
import "./Products.css";
import { ProductsData } from "./ProductsData.js";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get("http://localhost:3001/produit").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  };

  const handleFilter = (searchTerm) => {
    const filtered = products.filter((product) => {
      const name = `${product.nomProduit}`.toLowerCase();
      return name.startsWith(searchTerm.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const ProductsList = filteredProducts.map((produit) => {
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
        fetchFunction={fetchProducts}
        // onDeleteProduct={deleteProduct}
      />
    );
  });

  return (
    <div style={{ marginRight: "40px" }}>
      <Header titre="Produits" />
      <SearchBar onFilter={handleFilter} />
      <div className="products-container-grid">{ProductsList}</div>
    </div>
  );
}
