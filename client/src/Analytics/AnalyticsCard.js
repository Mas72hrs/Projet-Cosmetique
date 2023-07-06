import React from 'react'
import "./AnalyticsCard.css"

export default function AnalyticsCard(props) {
  return (
    <div className='analytics-card-container'>
      <div className='card-left'>
        <div style={{marginLeft:"20px"}}> 
        <h1>{props.name}</h1>
        <h2>{props.value} {props.name === "Profit" ? "Da" : ""}</h2>
        </div>


      </div>
      <div className='card-right'>

      </div>
    </div>
  )
}
