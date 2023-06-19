import React, { useState, useEffect } from 'react';
import './ProductToSellCard.css';
import trash from '../Icons/trash.png';

export default function ProductToSellCard(props) {
  const [quantite, setQuantite] = useState(1);
  const prixUnite = props.prixVendue;
  const [prix, setPrix] = useState(prixUnite * quantite);

  const increaseQuantite = () => {
    setQuantite((prevQuantite) => prevQuantite + 1);
  };

  const decreaseQuantite = () => {
    if (quantite > 1) {
      setQuantite((prevQuantite) => prevQuantite - 1);
    }
  };

  useEffect(() => {
    setPrix(prixUnite * quantite);
  }, [quantite, prixUnite]);

  return (
    <div className='product-tosell-card'>
      <h1>{props.nom}</h1>
      <div className='quantite-btns'>
        <button onClick={decreaseQuantite} className='sub-1-quantity'>
          -
        </button>
        {quantite}
        <button onClick={increaseQuantite} className='add-1-quantity'>
          +
        </button>
      </div>
      <p>Prix : {prix} da</p>
      <button className='supprimer-produit-btn'>
        <img src={trash} alt='edit' />
      </button>
    </div>
  );
}
