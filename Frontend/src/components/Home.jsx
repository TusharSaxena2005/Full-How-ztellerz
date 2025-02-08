import React from 'react'
import Navbar from './Navbar'

import './Home.css'


const Home = () => {
    return (
        <>
            <Navbar />
            <section id='home-page1'>
                <h1 id='web-name'>How'ztellerz</h1>
                <div id='outer-webname-dot'>
                    <p id='webname-dot'></p>
                    <p>Scroll down</p>
                </div>
            </section>

            <section id='outer-about-this-website'>
                <ul id='about-this-website'>
                    <h1>About this website</h1>
                    <p>How'ztellerz is a platform for people to buy, sell, and exchange items. It also allows users to post announcements or promotions. The website is designed to be user-friendly and easy to navigate. Users can easily add items to the marketplace and view items posted by others. The website also has a broadcast feature that allows users to post messages for others to see. The website is designed to be simple and intuitive, making it easy for users to find what they are looking for.</p>
                </ul>
            </section>

            <section id='outer-guide-box'>
                <ul id='guide-box-heading'>
                    <h1>Guide to use this website</h1>
                </ul>
                <ul className="inner-guide-box">
                    <li id="guide-box1" className="guide-box-img">
                        <img src="./guide/step1.png" alt="" />
                    </li>
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. Look at the top-right corner of the screen.</p>
                        <p>2. Find the "Explore Us" button.</p>
                        <p>3. Click on "Explore Us" to open the page.</p>
                    </li>
                </ul>
                <ul className="inner-guide-box">
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. You are now on the "Explore Us" page.</p>
                        <p>2. There are two options: <br />
                            &nbsp;&nbsp;&nbsp; Market Place left box with a shopping cart icon.<br />
                            &nbsp;&nbsp;&nbsp; Broadcast right box with a megaphone icon.</p>
                        <p>3. Click on "Market Place" to explore shopping-related features.</p>
                        <p>4. Click on "Broadcast" to access announcements or promotions.</p>
                    </li>
                    <li id="guide-box1" className="guide-box-img">
                        <img src="./guide/step2.png" alt="" />
                    </li>
                </ul>
                <ul className="inner-guide-box">
                    <li id="guide-box1" className="guide-box-img">
                        <img src="./guide/step3.png" alt="" />
                    </li>
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. On the left sidebar, find the "Add Item" button.</p>
                        <p>2. Click on the "+ Add Item" button.</p>
                        <p>3. A new page or form will open where you can enter item details.</p>
                        <p>4. Fill in the required information and submit.</p>
                    </li>
                </ul>
                <ul className="inner-guide-box">
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. Locate the broadcast message on the page.</p>
                        <p>2. Find the name of the person who posted it (e.g., "Swapnil").</p>
                        <p>3. Click on the name.</p>
                        <p>4. This will show more details about them the person.</p>
                    </li>
                    <li id="guide-box1" className="guide-box-img">
                        <img src="./guide/step4.png" alt="" />
                    </li>
                </ul>
            </section>

            <section id="mostouter-getInTouch">
                <div id="outer-getInTouch">
                    <h2 id="getInTouch-head">Contact us</h2>
                    <div id="GIT-outer-form">
                        <form id='review-form'>
                            <div id="inner-form">
                                <input type="text" name="name" placeholder="Name" required />
                                <input type="text" name="lastName" placeholder="Last name" required />
                                <input type="email" name="email" placeholder="Email Address" required />
                                <input type="text" name="phone" placeholder="Phone Number" required />
                            </div>
                            <textarea name="message" cols="20" rows="7" placeholder="Reason to contact us...." required></textarea>
                            <button id="form-btn" type="submit">Submit now</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
