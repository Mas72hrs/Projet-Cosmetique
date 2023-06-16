import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="loginpage-container">
      
        <form class="form">
          <div class="title">
            Bienvenue,<br /><span>Connecter Vous Pour Continuer</span>
          </div>
          <input type="text" placeholder="Nom Utilisateur ..."  className="input" />
          <input
            type="password"
            placeholder="Mot de Passe ..."
            name="password"
            className="input"
          />

         <Link to="/inpage"> <button className="button-confirm">Se Connecter</button></Link>
        </form>
     
    </div>
  );
}
