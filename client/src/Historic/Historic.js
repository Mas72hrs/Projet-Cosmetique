import React, { useEffect, useState } from "react";
import HistoricCard from "./HistoricCard";
import Header from "../Header/Header.js";
import axios from "axios";

export default function Historic() {
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    fetchVentes();
  }, []);

  const fetchVentes = async () => {
    await axios.get("http://localhost:3001/vente").then((response) => {
      setVentes(response.data);
    });
  };

  return (
    <div>
      <Header titre="Historique Ventes" />
      {ventes.map((vente) => {
        return (
          <HistoricCard
            prix_totale={vente.prixTotal}
            id={vente.id}
            key={vente.id}
            date={vente.date}
            userMadeIt={vente.UserId}
            productsBought={vente.productsBought}
          />
        );
      })}
    </div>
  );
}
