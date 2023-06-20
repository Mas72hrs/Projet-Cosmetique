import React, { useState } from "react";
import "./UserCard.css";
import trash from "../Icons/trash.png";
import edit from "../Icons/edit.png";
import Modal from "react-modal";

export default function UserCard(props) {


  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);



  const [phoneNumber, setPhoneNumber] = useState(props.numTel);
  const [role, setRole] = useState(props.role);
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState('');



  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  return (
    <div className="user-card-container">
      <div className="user-info">
        <h1>Nom et Prénom</h1>
        <p>{props.nom} {props.prenom}</p>
      </div>
      <div className="user-info">
        <h1>Num Télephone</h1>
        <p>{props.numTel}</p>
      </div>
      <div className="user-info">
        <h1>Role</h1>
        <p>{props.role}</p>
      </div>

      <div className="UserCard-buttons">
        <button className="modifier-produit-btn" style={{marginRight:"5px"}} onClick={() => setEditUserModal(true)}>
          <img src={edit} alt="trash" />
        </button>
        <button className="supprimer-produit-btn" onClick={() => setDeleteUserModal(true) }>
          <img
            src={trash}
            alt="edit"
          />
        </button>
      </div>
<Modal isOpen={deleteUserModal} className="outfit delete-user-moadal">

  <h1>Vous Voulez Supprimer {props.nom} {props.prenom} ?</h1>
  <div className="delete-user-btns">
    <button>
      Oui
    </button>
    <button onClick={() => setDeleteUserModal(false)}>
      Non
    </button>
  </div>

</Modal>

<Modal isOpen={editUserModal} className="outfit delete-user-moadal">

<h1>Modifier L'utilisateur</h1>

<form className="add-user-form" onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="one-input">
          <label>Numéro Téléphone : </label>
          <input
            type="number"
            minLength={10}
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="one-input">
          <label>Role : </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="vendeur">Vendeur</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="one-input">
          <label>Username : </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="one-input">
          <label>Mot de passe : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="row add-user-btns">
        <button type="submit">Modifier</button>
        <button type="reset" onClick={() => setEditUserModal(false)}>
          Annuler
        </button>
      </div>
    </form>


</Modal>

      
    </div>
  );
}
