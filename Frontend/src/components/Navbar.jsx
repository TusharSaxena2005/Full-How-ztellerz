import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [clientName, setClientName] = useState('');

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/current-user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
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
                setClientName('');
                window.location.href = '/';
            }
        } catch (error) {}
    };



    return (
        <>
            <nav>
                <div id="navbar">
                    <div id='logo'>
                        <img src="logo/logo1.jpg" alt="How'ztellerz" />
                    </div>
                    <div id='option-navbar'>
                        <Link to='/home' className='nav-btn' id='home-nav-btn'>Home</Link>
                        <Link to='/explore' className='nav-btn' id='Explore-nav-btn'>Explore Us</Link>
                        <Link onClick={handleLogout} className='nav-btn' id='Logout-nav-btn'>Logout</Link>
                        <span id='clientName'>{clientName}</span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;