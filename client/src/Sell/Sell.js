import React, { useState } from 'react'
import Header from "../Header/Header.js"
import "./Sell.css"
import {ProductsData} from "../Products/ProductsData.js"
import ProductWithoutCode from './ProductWithoutCode.js'
import ProductToSellCard from './ProductToSellCard.js'
import search from "../Icons/search-icon.png";
import done from "../Icons/done.png"

export default function Sell() {


  const ProductsList = ProductsData.map((produit) =>
  {return (
    <ProductWithoutCode
    nom = {produit.nom}
    quantite = {produit.quantite}
    prixVendue = {produit.prixVendue}
    />
  )}
  )


  const ProductsToSellList = ProductsData.map((produit) =>
  {return (
    <ProductToSellCard
    nom = {produit.nom}   
    prixVendue = {produit.prixVendue}
    />
  )}
  )


   

  return (
    <div className='big-sell-container'>


      <div className='sell-container'>

        <Header titre="Vendre"/>

        
        <div className='vendreList '>
          <div className='add-code'>
            <input 
            placeholder='Entrer Code Barre ...'
            type='number'
            />
            <button>
              <img src={done} alt='done' />
            </button>

          </div>
          {ProductsToSellList}
          {/*<h1>Pas de Produit a Vendre</h1>*/}
        </div>

        <button className="vendre-btn">
          Vendre
        </button>
        
      </div>


      <div className="products-without-barcode-list" >
        <h1 style={{textAlign:"center",margin:"20px 0",color:"white"}}>Produits Sans Code Barre</h1>

        <div className="product--Search--container">
        <img src={search} alt="search-icon" />
        <input
          placeholder="Rechercher Produit"
          className="outfit"
        />
      </div>
        
       {ProductsList}
      </div>


    </div>
  )
}
