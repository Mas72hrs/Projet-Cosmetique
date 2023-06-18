import React from 'react'

export default function Header(props) {
  return (
    <div style={{textAlign:"center"}}>
        <h1 style={{fontSize:"5vw",color:"white",marginTop:"20px"}}>{props.titre}</h1>
    </div>
  )
}
