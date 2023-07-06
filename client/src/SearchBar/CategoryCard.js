import React from 'react';
import trash from "../Icons/trash.png";
import "./CategoryCard.css";

export default function CategoryCard(props) {
  return (
    <div className='category-container'>
    <p>{props.nomCat}</p>
    <button
          className="supprimer-produit-btn"
          style={{height:"40px",width:"40px"}}
        >
          <img src={trash} alt="edit" />
        </button>
    </div>



  )
}
