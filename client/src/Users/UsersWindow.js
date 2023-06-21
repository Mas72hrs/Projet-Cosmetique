import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./UsersWindow.css";
import UserCard from "./UserCard";
import Modal from "react-modal";
import axios from "axios";

export default function UsersWindow() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/auth").then((response) => {
      setUsersData(response.data);
    });
  };

  const deleteUser = (productId) => {
    axios.delete(`http://localhost:3001/auth/byId/${productId}`).then(() => {
      // After deleting the product, fetch the updated list of products
      fetchUsers();
    });
  };

  const [addUserForm, setAddUserForm] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  const [form, setForm] = useState({
    nom: nom,
    prenom: prenom,
    telephone: phoneNumber,
    role: role,
    username: username,
    password: password,
  });

  useEffect(() => {
    setForm((prevFormData) => ({
      ...prevFormData,
      nom: nom,
      prenom: prenom,
      telephone: phoneNumber,
      role: role,
      username: username,
      password: password,
    }));
  }, [nom, prenom, phoneNumber, role, username, password]);

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth", form);
      console.log(response.data);
      window.location.reload();
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.error("Error adding new user", error);
      // Handle the error
    }
  };

  const userList = (
    <UserCard
      nom="Yasser"
      prenom="Zaaf"
      numTel="0557813545"
      role="Admin"
      username="yasser"
    />
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

      <div className="liste-users">
        {usersData.map((user) => {
          return (
            <UserCard
              key={user.id}
              idUser={user.id}
              nom={user.nom}
              prenom={user.prenom}
              numTel={user.telephone}
              role={user.role}
              username={user.username}
              salesMois={user.sales_mois}
              numTotalSales={user.numTotalSales}
              salesValue={user.sales_value}
              onDeleteUser={deleteUser}
            />
          );
        })}
      </div>

      <Modal isOpen={addUserForm} className="outfit add-user-modal">
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
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row add-user-btns">
            <button
              type="submit"
              onClick={() => {
                handleAddUser();
              }}
            >
              Ajouter
            </button>
            <button type="reset" onClick={() => setAddUserForm(false)}>
              Annuler
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
