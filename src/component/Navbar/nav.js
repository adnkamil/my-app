import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

export default function Nav() {
  return (
    <nav className="container">
      <ul className="list">
        <li ><Link to="/" className="item">Home</Link></li>
        <li ><Link to="about" className="item">About</Link></li>
        <li ><Link to="latihan" className="item">Latihan</Link></li>
      </ul>
    </nav>
  )
}
