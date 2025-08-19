import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './Home.css'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    useEffect(() => {
        // Web name animation
        gsap.fromTo('#web-name', {
            fontSize: '16vw',
            opacity: 1
        }, {
            fontSize: '17.3vw',
            opacity: 0,
            scrollTrigger: {
                trigger: '#web-name',
                start: 'top 30%',
                end: 'bottom 30%',
                scrub: true
            }
        });

        // Fade in animations for multiple elements
        const fadeElements = [
            '#about-this-website h1',
            '#about-this-website p',
            '#guide-box-heading h1',
            '.inner-guide-box',
            '#getInTouch-head',
            '#review-form input'
        ];

        fadeElements.forEach(selector => {
            gsap.fromTo(selector, {
                opacity: 0
            }, {
                opacity: 1,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: true
                }
            });
        });
    }, []);

    const sendContectUs = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        let allData = Object.fromEntries(form.entries());
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mailer/contactUsMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(allData),
            });

            if (response.ok) {
                alert('Your message has been sent successfully.');
                document.getElementById('review-form').reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    }

    return (
        <>
            <section id='home-page1'>
                <h1 id='web-name'>How'zellerz</h1>
                <div id='outer-webname-dot'>
                    <p id='webname-dot'></p>
                    <p>Scroll down</p>
                </div>
            </section>

            <section id='outer-about-this-website'>
                <ul id='about-this-website'>
                    <h1>About this website</h1>
                    <p>How'zellerz is a platform for people to buy, sell, and exchange items. It also allows users to post announcements or promotions. The website is designed to be user-friendly and easy to navigate. Users can easily add items to the marketplace and view items posted by others. The website also has a broadcast feature that allows users to post messages for others to see. The website is designed to be simple and intuitive, making it easy for users to find what they are looking for.</p>
                </ul>
            </section>

            <section id='outer-guide-box'>
                <ul id='guide-box-heading'>
                    <h1>Guide to use this website</h1>
                </ul>
                <ul className="inner-guide-box guide-box">
                    <li id="guide-box1" className="guide-box-img">
                        <img src="./guide/step1.png" alt="" />
                    </li>
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. Look at the top-right corner of the screen.</p>
                        <p>2. Find the "Explore Us" button.</p>
                        <p>3. Click on "Explore Us" to open the page.</p>
                    </li>
                </ul>
                <ul className="inner-guide-box opposite-guide-box">
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
                <ul className="inner-guide-box guide-box">
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
                <ul className="inner-guide-box opposite-guide-box">
                    <li id="guide-box2" className="guide-box-para">
                        <p>1. Locate the broadcast message on the page.</p>
                        <p>2. Find the name of the person who posted it (e.g., "Swapnil").</p>
                        <p>3. Click on the name.</p>
                        <p>4. This will show more details about them.</p>
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
                        <form id='review-form' onSubmit={sendContectUs}>
                            <div id="inner-form">
                                <input type="text" name="firstName" placeholder="First Name" required />
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

            <footer>
                <div id="outer-footer">
                    <div id="inner-footer1" className="inner-footer">
                        <div id="footer">
                            <div id="footer-logo">
                                <img src='/logo/logo.jpg' alt="Logo" id="logo" />
                                <h2>ow'zellerz</h2>
                            </div>
                            <ul id="bar" className="nav">
                                <li id="footer-ele1" className="footer-ele"><a href="#outer-guide-box">Guide</a></li>
                                <li id="footer-ele2" className="footer-ele"><a href="#outer-about-this-website">About Us</a></li>
                                <li id="footer-ele2" className="footer-ele"><a href="#mostouter-getInTouch">Contact Us</a></li>
                                <li id="footer-ele3" className="footer-ele"><Link to="/explore">Explore Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div id="inner-footer2" className="inner-footer">
                        <ul id="footer2-ele1" className="footer2-ele">
                            <li>
                                <Link to="https://www.instagram.com/" id="footer2-link1" className="footer2-links">
                                    <img src='/icons/instagram.svg' alt="Instagram" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.facebook.com/" id="footer2-link2" className="footer2-links">
                                    <img src='/icons/facebook.svg' alt="Facebook" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.linkdin.com/" id="footer2-link3" className="footer2-links">
                                    <img src='/icons/linkdin.svg' alt="LinkedIn" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.x.com/" id="footer2-link4" className="footer2-links">
                                    <img src='/icons/x-twitter.svg' alt="Twitter" />
                                </Link>
                            </li>
                        </ul>
                        <ul id="footer2-ele2" className="footer2-ele">
                            <li>
                                <h4>&copy; copyright reserved 2025</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home
