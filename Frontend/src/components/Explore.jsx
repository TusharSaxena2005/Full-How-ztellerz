import React from 'react'
import './Explore.css'
import Navbar from './Navbar'

const Explore = () => {
  return (
    <>
      <div id='outer-explore'>
        <Navbar />
        <div id='inner-explore'>
          <h1>Explore Us</h1>
          <div id='explore-option-btn'>
            <button id="explore-btn1" className="explore-btn" onClick={() => window.location.href = '/marketplace'}>
              <img src="icons/marketplace.svg" alt="marketplace" />
              <h2>Market Place</h2>
            </button>
            <button id="explore-btn2" className="explore-btn" onClick={() => window.location.href = '/broadcast'}>
              <img src="icons/broadcast.svg" alt="broadcast" />
              <h2>Broadcast</h2>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
