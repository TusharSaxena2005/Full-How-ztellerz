import React, { useEffect } from 'react'
import Navbar from './Navbar'

import './Home.css'


const Home = () => {

  return (
    <>
      <Navbar />
      <div id='home-page1'>
        <h1 id="web-name">How'ztellerz</h1>
        <div id='outer-webname-dot'>
          <p id='webname-dot'></p>
          <p>Scroll down</p>
        </div>
      </div>
    </>
  )
}

export default Home
