import React, { useState } from "react";
import Header from "../Header/Header";
import "./UsersWindow.css";
import UserCard from "./UserCard";
import Modal from "react-modal";

export default function UsersWindow() {
  const [addUserForm, setAddUserForm] = useState(false);



  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  const userList = (
    <UserCard nom="Yasser" prenom="Zaaf" numTel="0557813545" role="Admin" username="yasser"/>
  );

  return (
    <div className="users-window-container">
      <Header titre="Utilisateurs" />
      <button
        className="ajouter-produit-btn outfit"
        onClick={() => setAddUserForm(true)}
      >
        Ajouter Utilisateur
      </button>

      <div className="liste-users">{userList}</div>

      <Modal
        isOpen={addUserForm}
        className="outfit add-user-modal"
      >
        <h1>Ajout D'utilisateur</h1>

        <form className="add-user-form" onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="one-input">
          <label>Nom : </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="one-input">
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
      </div>

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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
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
        <button type="submit">Ajouter</button>
        <button type="reset" onClick={() => setAddUserForm(false)}>
          Annuler
        </button>
      </div>
    </form>
      </Modal>

    </div>
  );
}
