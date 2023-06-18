import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

export default function LoginPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { authState, setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setError(true);
      } else {
        const userData = {
          token: response.data.token,
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
          status: true,
        };
        localStorage.setItem("accessToken", JSON.stringify(userData));
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          role: response.data.role,
          status: true,
        });
        navigate("/inpage");
      }
    });
  };

  return (
    <div className="loginpage-container">
      <form class="form">
        <div class="title">
          Bienvenue,
          <br />
          <span>Connecter Vous Pour Continuer</span>
        </div>
        <input
          type="text"
          placeholder="Nom Utilisateur ..."
          className="input"
          required="required"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de Passe ..."
          name="password"
          className="input"
          required="required"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && (
          <p style={{ color: "red" }}>Email ou Mot de pass incorrect</p>
        )}
        {/* <Link to="/inpage"> <button className="button-confirm">Se Connecter</button></Link> */}
        <button
          className="button-confirm"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
}
