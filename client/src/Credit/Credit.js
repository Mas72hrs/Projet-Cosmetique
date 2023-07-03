import React from 'react'
import Header from '../Header/Header'
import CreditCard from './CreditCard'

export default function Credit() {
  return (
    <div>
        <Header titre="Liste De Crédit"/>

      <div className="liste-users">
          <CreditCard nom="Youcef Bendjidel" somme="500"/>
      </div>

    </div>

  )
}
