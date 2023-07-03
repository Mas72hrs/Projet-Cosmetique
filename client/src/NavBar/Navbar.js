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
        <Link to="/inpage/vendre">
          <li
            className={location.pathname === "/inpage/vendre" ? "active" : ""}
          >
            <img src={sell} alt="logo-Vendre" />
            <a>Vendre</a>
          </li>
        </Link>
        <Link to="/inpage/produits">
          <li
            className={location.pathname.includes("/produits") ? "active" : ""}
          >
            <img src={product} alt="logo-Produits" />
            <a>Produits</a>
          </li>
        </Link>
        <Link to="/inpage/historique">
          <li
            className={
              location.pathname === "/inpage/historique" ? "active" : ""
            }
          >
            <img src={historical} alt="logo-Historique" />
            <a>Historique</a>
          </li>
        </Link>
        <Link to="/inpage/credit">
          <li
            className={
              location.pathname === "/inpage/credit" ? "active" : ""
            }
          >
            <img src={money} alt="logo-credit" />
            <a>Crédit</a>
          </li>
        </Link>

        <Link to="/inpage/analytics">
          <li
            className={
              location.pathname === "/inpage/analytics" ? "active" : ""
            }
          >
            <img src={analytics} alt="logo-Analytics" />
            <a>Analytics</a>
          </li>
        </Link>
        
        <Link to="/inpage/utilisateurs">
          <li
            className={
              location.pathname === "/inpage/utilisateurs" ? "active" : ""
            }
          >
            <img src={user} alt="logo-utilisateurs" />
            <a>Utilisateurs</a>
          </li>
        </Link>
      </ul>

      <div className="navbar--user--info">
        <h3>{props.nom}</h3>
        <p>Admin</p>
      </div>
    </nav>
  );
}
