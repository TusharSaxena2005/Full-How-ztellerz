import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import './Profile.css'

const Profile = () => {
    return (
        <>
            <Navbar />
            <main>
                <section id='outer-profile-pic' className='profile-info'>
                    <div id="profile-pic">
                        <img src="icons/profileIcon.svg" alt="" />
                    </div>
                    <button id='change-profile-pic' className='change-btn'>Change Profile Picture</button>
                </section>
                <section id='outer-profile-info' className='profile-info'>
                    <div id="profile-information">
                        <ul>
                            <li className='profile-info-item'>
                                <span>Name: </span>
                                <span>Tushar Saxena</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Mail ID: </span>
                                <span>tushar.dec6@gmail.com</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Contact No. : </span>
                                <span>8395900770</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Roll No: </span>
                                <span>2310991152</span>
                            </li>
                        </ul>
                        <ul>
                            <li className='profile-info-item'>
                                <span>Gender: </span>
                                <span>Male</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Hostel : </span>
                                <span>Archemidies A</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Floor No: </span>
                                <span>6</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Room No: </span>
                                <span>631</span>
                            </li>
                        </ul>
                    </div>
                    <div id='profile-btn'>
                        <button id='change-profile-info' className='change-btn'>Change Profile Information</button>
                        <button id='change-password' className='change-btn'>Change Password</button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Profile
