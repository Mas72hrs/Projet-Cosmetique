import React from "react";
import "./Navbar.css";
import sell from "../Icons/icons8-sell-96.png";
import product from "../Icons/icons8-product-96.png";
import historical from "../Icons/icons8-historical-64.png";
import analytics from "../Icons/icons8-analytics-96.png";
import user from "../Icons/icons8-user-96.png";
import money from "../Icons/icons8-money-100.png";
import logo from "../Icons/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();

  return (
    <nav>
      <img src={logo} alt="logo-application" />
      <ul>
        <li className={location.pathname === "/inpage/vendre" ? "active" : ""}>
          <Link to="/inpage/vendre">
            <img src={sell} alt="logo-Vendre" />
            Vendre
          </Link>
        </li>
        <li className={location.pathname.includes("/produits") ? "active" : ""}>
          <Link to="/inpage/produits">
            <img src={product} alt="logo-Produits" />
            Produits
          </Link>
        </li>
        <li
          className={location.pathname === "/inpage/historique" ? "active" : ""}
        >
          <Link to="/inpage/historique">
            <img src={historical} alt="logo-Historique" />
            Historique
          </Link>
        </li>
        <li className={location.pathname === "/inpage/credit" ? "active" : ""}>
          <Link to="/inpage/credit">
            <img src={money} alt="logo-credit" />
            Crédit
          </Link>
        </li>
        <li
          className={location.pathname === "/inpage/analytics" ? "active" : ""}
        >
          <Link to="/inpage/analytics">
            <img src={analytics} alt="logo-Analytics" />
            Analytics
          </Link>
        </li>
        <li
          className={
            location.pathname === "/inpage/utilisateurs" ? "active" : ""
          }
        >
          <Link to="/inpage/utilisateurs">
            <img src={user} alt="logo-utilisateurs" />
            Utilisateurs
          </Link>
        </li>
      </ul>

      <div className="navbar--user--info">
        <h3>{props.nom}</h3>
        <p>Admin</p>
      </div>
    </nav>
  );
}
