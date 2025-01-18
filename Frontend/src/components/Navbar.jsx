import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [clientName, setClientName] = useState('');

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/current-user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setClientName(data.data.name);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setIsLoggedIn(false);
                setClientName('');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            <nav>
                <div id="navbar">
                    <div id='logo'>
                        <img src="logo/logo1.jpg" alt="How'ztellerz" />
                    </div>
                    <div id='option-navbar'>
                        <Link to='/' className='nav-btn' id='home-nav-btn'>Home</Link>
                        <Link className='nav-btn' id='Explore-nav-btn'>Explore Us</Link>
                        {!isLoggedIn && <Link to='/signup' className='nav-btn' id='Freshie-nav-btn'>Freshie</Link>}
                        {!isLoggedIn && <Link to='/login' className='nav-btn' id='CheckIn-nav-btn'>Check in</Link>}
                        {isLoggedIn && <Link onClick={handleLogout} className='nav-btn' id='Logout-nav-btn'>Logout</Link>}
                        {isLoggedIn && <span id='clientName'>{clientName}</span>}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;