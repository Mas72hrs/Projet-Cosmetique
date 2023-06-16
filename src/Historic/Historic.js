import React from 'react'
import HistoricCard from './HistoricCard'
import Header from "../Header/Header.js"

export default function Historic() {
  return (
    <div>
      <Header titre="Historique Ventes" />
      <HistoricCard prix_totale="5200" id="2" />
    </div>
  )
}
