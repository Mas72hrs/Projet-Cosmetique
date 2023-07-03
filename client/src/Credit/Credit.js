import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import CreditCard from "./CreditCard";
import axios from "axios";

export default function Credit() {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    await axios.get("http://localhost:3001/credit").then((response) => {
      setCredits(response.data);
    });
  };
  return (
    <div>
      <Header titre="Liste De Crédit" />

      <div className="liste-users">
        {credits.map((credit) => {
          return (
            <CreditCard
              nom={credit.client}
              somme={credit.prixTotalCredit}
              date={credit.date}
              fetchCredits={fetchCredits}
              id={credit.id}
              key={credit.id}
            />
          );
        })}
      </div>
    </div>
  );
}
