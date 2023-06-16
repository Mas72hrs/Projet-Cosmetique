import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from "../NavBar/Navbar"
import Sell from "../Sell/Sell"
import Products from "../Products/Products"
import OneProductWindow from "../Products/OneProductWindow"
import Historic from "../Historic/Historic"
import Analytics from "../Analytics/Analytics"
import { useParams } from 'react-router-dom';


export default function InPage() {

  const { productName } = useParams();

  return (
    <div className='inpage--container' style={{ display: 'grid', gridTemplateColumns: '20% 80%' }}>
      <div>
        <Navbar />    
      </div>
      <div style={{padding:"0 0px 0 40px"}}>
      <Routes>
      <Route path='/vendre' element={<Sell />} />
      <Route path='/produits' element={<Products/>} />
      <Route path='/historique' element={<Historic/>} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/produits/:productName' element={<OneProductWindow />} />

      </Routes>
      </div>
    </div>
  )
}
