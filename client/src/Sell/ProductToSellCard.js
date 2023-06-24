import React, { useState, useEffect } from "react";
import "./ProductToSellCard.css";
import trash from "../Icons/trash.png";
import axios from "axios";

export default function ProductToSellCard(props) {
  const { onFetch } = props;
  const { ondelete } = props;
  const [quantite, setQuantite] = useState(props.Quantity);
  const [unité, setUnité] = useState(props.prixVendue);

  const [prix, setPrix] = useState(unité * quantite);

  const modifierPrixTotal = async (id) => {
    try {
      const response = await axios
        .patch(`http://localhost:3001/cart/TotalPrice/${id}`, { Qte: quantite })
        .then(() => {
          onFetch();
          console.log(response.data.message);
        });
    } catch (error) {
      console.error("Error updating totalPrice ", error);
    }
  };

  const increaseQuantite = () => {
    setQuantite((prevQuantite) => prevQuantite + 1);
  };
  const handleDelete = () => {
    ondelete(props.idItem);
  };

  const decreaseQuantite = () => {
    if (quantite > 1) {
      setQuantite((prevQuantite) => prevQuantite - 1);
    }
  };

  useEffect(() => {
    setPrix(unité * quantite);
    modifierPrixTotal(props.idItem);
  }, [quantite, unité, prix]);

  return (
    <div className="product-tosell-card">
      <h1>{props.nom}</h1>
      <div className="quantite-btns">
        <button onClick={decreaseQuantite} className="sub-1-quantity">
          -
        </button>
        {quantite}
        <button onClick={increaseQuantite} className="add-1-quantity">
          +
        </button>
      </div>
      <p>Prix : {prix} da</p>
      <button className="supprimer-produit-btn" onClick={handleDelete}>
        <img src={trash} alt="edit" />
      </button>
    </div>
  );
}
