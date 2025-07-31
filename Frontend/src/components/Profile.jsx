import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import './Profile.css'
import Loader from './Loader'

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

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
                setUserData(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching current user:', error);
            setLoading(false);
        }
    };

    const handleProfilePicSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.getElementById('profile-pic-upload');

        if (fileInput.files[0]) {
            formData.append('profilePic', fileInput.files[0]);

            try {
                setLoading(true);
                const response = await fetch('https://api.howzellerz.store/api/v1/user/update-profile-pic', {
                    method: 'PATCH',
                    body: formData,
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.data);
                    document.getElementById('outer-profile-pic-form').style.display = 'none';
                    alert('Profile picture updated successfully!');
                } else {
                    alert('Failed to update profile picture');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error updating profile picture:', error);
                setLoading(false);
            }
        } else {
            alert('Please select an image');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;

        if (!oldPassword || !newPassword) {
            alert('Please fill both password fields');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('https://api.howzellerz.store/api/v1/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldPassword, newPassword }),
                credentials: 'include'
            });

            if (response.ok) {
                document.getElementById('outer-profile-password-form').style.display = 'none';
                document.getElementById('old-password').value = '';
                document.getElementById('new-password').value = '';
                alert('Password changed successfully!');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to change password');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error changing password:', error);
            setLoading(false);
        }
    };

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        const phoneNo = document.getElementById('profile-info-number').value;
        const hostelName = document.getElementById('profile-info-hostel').value;
        const floorNo = document.getElementById('profile-info-floorNo').value;
        const roomNo = document.getElementById('profile-info-roomNo').value;

        const updateData = {};
        if (phoneNo) updateData.phoneNo = phoneNo;
        if (hostelName) updateData.hostelName = hostelName;
        if (floorNo) updateData.floorNo = floorNo;
        if (roomNo) updateData.roomNo = roomNo;

        if (Object.keys(updateData).length === 0) {
            alert('Please fill at least one field to update');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('https://api.howzellerz.store/api/v1/user/update-details', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data);
                document.getElementById('outer-profile-info-form').style.display = 'none';
                // Clear form fields
                document.getElementById('profile-info-number').value = '';
                document.getElementById('profile-info-hostel').value = '';
                document.getElementById('profile-info-floorNo').value = '';
                document.getElementById('profile-info-roomNo').value = '';
                alert('Profile details updated successfully!');
            } else {
                alert('Failed to update profile details');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error updating profile details:', error);
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Navbar />
            <main id='profile-main'>
                <section id='outer-profile-pic' className='profile-info'>
                    <div id="profile-pic">
                        <img src={userData?.profilePic || "icons/profileIcon.svg"} alt="Profile" />
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
                                <span className='profile-info-value'>{userData?.name || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Mail ID :-</span>
                                <span className='profile-info-value'>{userData?.mailId || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Contact No. :-</span>
                                <span className='profile-info-value'>{userData?.phoneNo || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Roll No :-</span>
                                <span className='profile-info-value'>{userData?.rollNo || 'Loading...'}</span>
                            </li>
                        </ul>
                        <ul>
                            <li className='profile-info-item'>
                                <span>Gender :-</span>
                                <span className='profile-info-value'>{userData?.gender || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Hostel :-</span>
                                <span className='profile-info-value'>{userData?.hostelName || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Floor No :-</span>
                                <span className='profile-info-value'>{userData?.floorNo || 'Loading...'}</span>
                            </li>
                            <li className='profile-info-item'>
                                <span>Room No :-</span>
                                <span className='profile-info-value'>{userData?.roomNo || 'Loading...'}</span>
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

                {/* Profile Picture Upload Form */}
                <section id='outer-profile-pic-form'>
                    <form id='profile-pic-form' onSubmit={handleProfilePicSubmit}>
                        <div id="profile-pic-form-cross-btn">
                            <button type="button" onClick={(e) => {
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

                {/* Password Change Form */}
                <section id='outer-profile-password-form'>
                    <form id='profile-password-form' onSubmit={handlePasswordChange}>
                        <div id="profile-password-form-cross-btn">
                            <button type="button" onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('outer-profile-password-form').style.display = 'none'
                            }}>
                                <img src="icons/cross.svg" alt="" />
                            </button>
                        </div>
                        <div id='profile-password-form-main'>
                            <label htmlFor='old-password' className='change-btn'>Change Password</label>
                            <div id='inner-profile-password-form'>
                                <input type='password' id='old-password' placeholder='Old Password' />
                                <input type='password' id='new-password' placeholder='New Password' />
                                <button type='submit' className='change-btn'>Change Password</button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Profile Information Update Form */}
                <section id='outer-profile-info-form'>
                    <form id='profile-info-form' onSubmit={handleUpdateDetails}>
                        <div id="profile-info-form-cross-btn">
                            <button type="button" onClick={(e) => {
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
                                    <input type='number' id='profile-info-number' placeholder='Contact Number' />
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