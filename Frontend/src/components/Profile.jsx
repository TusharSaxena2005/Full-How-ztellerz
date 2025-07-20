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
                    <button id='change-profile-pic' className='change-btn' onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('outer-profile-pic-form').style.display = 'flex';
                    }}>Change Profile Picture</button>
                </section>
                <section id='outer-profile-info' className='profile-info'>
                    <div id="profile-information">
                        <ul>
                            <li className='profile-info-item'>
                                <span>Name :- </span>
                                <span className='profile-info-value'>Tushar Saxena</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Mail ID :-</span>
                                <span className='profile-info-value'>tushar.dec6@gmail.com</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Contact No. :-</span>
                                <span className='profile-info-value'>8395900770</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Roll No :-</span>
                                <span className='profile-info-value'>2310991152</span>
                            </li>
                        </ul>
                        <ul>
                            <li className='profile-info-item'>
                                <span>Gender :-</span>
                                <span className='profile-info-value'>Male</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Hostel :-</span>
                                <span className='profile-info-value'>Archemidies A</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Floor No :-</span>
                                <span className='profile-info-value'>6</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Room No :-</span>
                                <span className='profile-info-value'>631</span>
                            </li>
                        </ul>
                    </div>
                    <div id='profile-btn'>
                        <button id='change-profile-info' className='change-btn' onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('outer-profile-info-form').style.display = 'flex'
                        }}>Change Profile Information</button>
                        <button id='change-password' className='change-btn' onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('outer-profile-password-form').style.display = 'flex'
                        }}>Change Password</button>
                    </div>
                </section>
                <section id='outer-profile-pic-form'>
                    <form id='profile-pic-form'>
                        <div id="profile-pic-form-cross-btn">
                            <button onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('outer-profile-pic-form').style.display = 'none'
                            }}>
                                <img src="icons/cross.svg" alt="" />
                            </button>
                        </div>
                        <div id='profile-pic-form-main'>
                            <label htmlFor='profile-pic-upload' className='change-btn'>Upload New Profile Picture</label>
                            <div id='inner-profile-pic-form'>
                                <input type='file' id='profile-pic-upload' accept='image/*' />
                                <button type='submit' className='change-btn'>Upload</button>
                            </div>
                        </div>
                    </form>
                </section>
                <section id='outer-profile-password-form'>
                    <form id='profile-password-form'>
                        <div id="profile-password-form-cross-btn">
                            <button onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('outer-profile-password-form').style.display = 'none'
                            }}>
                                <img src="icons/cross.svg" alt="" />
                            </button>
                        </div>
                        <div id='profile-password-form-main'>
                            <label htmlFor='profile-password' className='change-btn'>Change Password</label>
                            <div id='inner-profile-password-form'>
                                <input type='password' id='profile-password' placeholder='Old Password' />
                                <input type='password' id='profile-password' placeholder='New Password' />
                                <button type='submit' className='change-btn'>Change Password</button>
                            </div>
                        </div>
                    </form>
                </section>
                <section id='outer-profile-info-form'>
                    <form id='profile-info-form'>
                        <div id="profile-info-form-cross-btn">
                            <button onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('outer-profile-info-form').style.display = 'none'
                            }}>
                                <img src="icons/cross.svg" alt="" />
                            </button>
                        </div>
                        <div id='profile-info-form-main'>
                            <label htmlFor='profile-info' className='change-btn'>Change Information</label>
                            <div id='inner-profile-info-form'>
                                <div className='profile-info-inputs'>
                                    <input type='text' id='profile-info-name' placeholder='Name' />
                                    <input type='number' id='profile-info-number' placeholder='Contact Number' />
                                </div>
                                <div className='profile-info-inputs'>
                                    <input type='number' id='profile-info-roll' placeholder='Roll Number' />
                                    <input type='text' id='profile-info-hostel' placeholder='Hostel' />
                                </div>
                                <div className='profile-info-inputs'>
                                    <input type='number' id='profile-info-floorNo' placeholder='Floor Number' />
                                    <input type='number' id='profile-info-roomNo' placeholder='Room Number' />
                                </div>
                                <button type='submit' className='change-btn'>Change Information</button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile
