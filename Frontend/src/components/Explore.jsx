import React, { useState } from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Explore = () => {
  return (
    <>
      <Navbar />
      <div id='outer-explore'>
        <div id='inner-explore'>
          <h1>Explore Us</h1>
          <div id='explore-option-btn'>
            <Link to='/marketplace' id="explore-btn1" className="explore-btn">
              <img src="icons/marketplace.svg" alt="marketplace" />
              <h2>Market Place</h2>
            </Link>
            <Link to='/broadcast' id="explore-btn2" className="explore-btn">
              <img src="icons/broadcast.svg" alt="broadcast" />
              <h2>Broadcast</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
