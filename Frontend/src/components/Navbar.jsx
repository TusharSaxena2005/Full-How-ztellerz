import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Loader from './Loader'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [clientName, setClientName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.howzellerz.store/api/v1/user/current-user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setClientName(data.data.name);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        const response = await fetch('https://api.howzellerz.store/api/v1/user/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            setClientName('');
            window.location.href = '/';
        }
        setLoading(false);
    };


    return (
        <>
            {loading && (
                <Loader />
            )}
            <nav>
                <div id="navbar">
                    <div id='logo'>
                        <img src="logo/logo1.jpg" alt="How'ztellerz" />
                    </div>
                    <div id="navbar-btn" >
                        <button id='navbar-inner-btn' onClick={() => {
                            if (document.getElementById("navbar-inner-btn-img").src.includes("humberger.svg")) {
                                document.getElementById("navbar-inner-btn-img").src = "icons/navbarCross.svg";
                                document.getElementById("mobile-navbar").style.display = "flex";
                            } else {
                                document.getElementById("navbar-inner-btn-img").src = "icons/humberger.svg";
                                document.getElementById("mobile-navbar").style.display = "none";
                            }
                        }}>
                            <img id='navbar-inner-btn-img' src="icons/humberger.svg" alt="menu" />
                        </button>
                    </div>
                    <div id='option-navbar'>
                        <Link to='/home' className='nav-btn' id='home-nav-btn'>Home</Link>
                        <Link to='/explore' className='nav-btn' id='Explore-nav-btn'>Explore Us</Link>
                        <Link onClick={handleLogout} className='nav-btn' id='Logout-nav-btn'>Logout</Link>
                        <Link to='/profile' id='clientName'>{clientName}</Link>
                    </div>
                </div>
            </nav>
            <div id='mobile-navbar'>
                <Link to='/home' className='nav-btn' id='home-nav-btn'>Home</Link>
                <Link to='/explore' className='nav-btn' id='Explore-nav-btn'>Explore Us</Link>
                <Link onClick={handleLogout} className='nav-btn' id='Logout-nav-btn'>Logout</Link>
                <Link to='/profile' id='clientName'>{clientName}</Link>
            </div>
        </>
    );
};

export default Navbar;