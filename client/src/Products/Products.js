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
    axios.get(`http://localhost:3001/produit`).then((response) => {
      setProducts(response.data);
    });
  }, []);
  const ProductsList = products.map((produit) => {
    return (
      <ProductCard
        idProduit={produit.id}
        idCategory={produit.CategorieId}
        nom={produit.nomProduit}
        quantite={produit.quantite}
        prixAchete={produit.prix_A}
        prixVendue={produit.prix_V}
        codeBar={produit.codeBar}
        description={produit.description}
      />
    );
  });

  return (
    <div style={{marginRight:"40px"}}>
      <Header titre="Produits" />
      <SearchBar />
      <div className="products-container-grid">{ProductsList}</div>

      
    </div>
  );
}
