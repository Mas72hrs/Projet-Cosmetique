import React from 'react'
import ProductCard from './ProductCard'
import SearchBar from '../SearchBar/SearchBar'
import Header from '../Header/Header'
import "./Products.css"
import {ProductsData} from "./ProductsData.js"



export default function Products() {

  const ProductsList = ProductsData.map((produit) =>
  {return (
    <ProductCard
    nom = {produit.nom}
    quantite = {produit.quantite}
    prixAchete = {produit.prixAchete}
    prixVendue = {produit.prixVendue}
    />
  )}
  )

  return (
    <div>
       <Header titre="Produits" />
        <SearchBar />      
        <div className='products-container-grid'>
          {ProductsList}
        </div>
       
    </div>
    
  )
}
