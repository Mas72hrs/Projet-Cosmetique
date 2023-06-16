import React, { useState } from 'react'
import Header from "../Header/Header.js"
import "./Sell.css"
import {ProductsData} from "../Products/ProductsData.js"
import ProductWithoutCode from './ProductWithoutCode.js'
import arrow from "../Icons/icons8-arrow-100.png"

export default function Sell() {

  const [isListOpen, setListOpen] = useState(false);

  const ProductsList = ProductsData.map((produit) =>
  {return (
    <ProductWithoutCode
    nom = {produit.nom}
    quantite = {produit.quantite}
    prixVendue = {produit.prixVendue}
    />
  )}
  )
  return (
    <div className='big-sell-container'>


      <div className='sell-container'>

        <Header titre="Vendre"/>
        <button className='open-product-list' onClick={() => setListOpen(!isListOpen)} > <img src={arrow} alt='arrow' style={{ transform: isListOpen ? 'rotate(180deg)' : 'rotate(0)' }} />  </button>
        <div className='vendreList centre-text'>
          <h1>Pas de Produit a Vendre</h1>
        </div>

        <button className="vendre-btn">
          Vendre
        </button>
        
      </div>


      <div className={`products-without-barcode-list ${isListOpen ? 'slide-in' : ''}`}>
        <h1 style={{textAlign:"center",margin:"20px 0",color:"white"}}>Produits Sans Code Barre</h1>
       {ProductsList}
      </div>


    </div>
  )
}
