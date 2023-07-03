import React, { useState } from 'react'
import trash from "../Icons/trash.png";
import edit from "../Icons/edit.png";
import Modal from "react-modal";
import "./CreditCard.css"

export default function CreditCard(props) {

  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [sommePaye, setSommePaye] = useState(0);

  return (
    <div className="credit-card-container">
    <div className="user-info">
      <h1>Nom De Client</h1>
      <p>
        {props.nom}
      </p>
    </div>

    <div className="user-info">
      <h1>Somme Crédit</h1>
      <p>{props.somme} Da</p>
    </div>

    <div className="UserCard-buttons">
      <button
        className="modifier-produit-btn"
        style={{ marginRight: "5px" }}
        onClick={() => setEditUserModal(true)}
      >
        <img src={edit} alt="trash" />
      </button>
      <button
        className="supprimer-produit-btn"
        onClick={() => setDeleteUserModal(true)}
      >
        <img src={trash} alt="edit" />
      </button>
    </div>


    <Modal isOpen={deleteUserModal} className="outfit delete-user-moadal">
        <h1>
          Vous Voulez Supprimer {props.nom} De La Liste De Crédit ?
        </h1>
        <div className="delete-user-btns">
          <button >Oui</button>
          <button onClick={() => setDeleteUserModal(false)}>Non</button>
        </div>
      </Modal>

      <Modal isOpen={editUserModal} className="outfit delete-user-moadal">
        <h1>Crédit Payé</h1>

        <form className="add-user-form" >
          <div className="row">
            <div className="one-input">
              <label>Somme Payé : </label>
              <input
                type="number"
                pattern="[0-9]{10}"
                value={sommePaye}
              />
            </div>
          </div>



          <div className="row add-user-btns">
            <button
              type="submit"
            >
              valider
            </button>
            <button type="reset" onClick={() => setEditUserModal(false)}>
              Annuler
            </button>
          </div>
        </form>
      </Modal>

  </div>
  )
}
