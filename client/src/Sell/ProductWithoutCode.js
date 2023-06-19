import React from 'react'
import "./ProductWithoutCode.css"

export default function ProductWithoutCode(props) {
  return (
    <div className='produits-sans-code-container'>
        <div className='details'>
       
        <h1>{props.nom}</h1>
        <p>Quantité : {props.quantite}</p>

        </div>

        <button className='add-to-cart'>
            Ajouter
        </button>

    </div>
  )
}
