import React, { useState, useEffect } from "react";
import "./UserCard.css";
import trash from "../Icons/trash.png";
import edit from "../Icons/edit.png";
import Modal from "react-modal";
import axios from "axios";

export default function UserCard(props) {
  const { onDeleteUser } = props;

  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(props.numTel);
  const [role, setRole] = useState(props.role);

  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  const [form, setForm] = useState({
    telephone: phoneNumber,
    role: role,

    password: password,
  });

  useEffect(() => {
    setForm((prevFormData) => ({
      ...prevFormData,

      telephone: phoneNumber,
      role: role,

      password: password,
    }));
  }, [phoneNumber, role, password]);

  const modifierUser = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/auth/byIdInfos/${id}`,
        form
      );
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user Informations:", error);
    }
  };

  return (
    <div className="user-card-container">
      <div className="user-info">
        <h1>Nom et Prénom</h1>
        <p>
          {props.nom} {props.prenom}
        </p>
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
          Vous Voulez Supprimer {props.nom} {props.prenom} ?
        </h1>
        <div className="delete-user-btns">
          <button onClick={() => onDeleteUser(props.idUser)}>Oui</button>
          <button onClick={() => setDeleteUserModal(false)}>Non</button>
        </div>
      </Modal>

      <Modal isOpen={editUserModal} className="outfit delete-user-moadal">
        <h1>Modifier L'utilisateur</h1>

        <form className="add-user-form" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="one-input">
              <label>Numéro Téléphone : </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number."
                value={phoneNumber}
                onChange={(e) => {
                  const inputPhoneNumber = e.target.value
                    .replace(/\D/g, "")
                    .substring(0, 10);
                  setPhoneNumber(inputPhoneNumber);
                }}
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
              <label>Mot de passe : </label>
              <input
                type="password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row add-user-btns">
            <button
              type="submit"
              onClick={() => {
                modifierUser(props.idUser);
              }}
            >
              Modifier
            </button>
            <button type="reset" onClick={() => setEditUserModal(false)}>
              Annuler
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
