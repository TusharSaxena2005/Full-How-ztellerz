import React, { useState } from 'react'
import './SignUp.css'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedFormData, setStoredFormData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag = true;
    const formData = new FormData(e.target);
    let allData = Object.fromEntries(formData.entries());
    if (allData.name == '') {
      document.getElementById('name').style.border = '2px solid red';
      flag = false;
    }
    if (allData.phoneNo == '') {
      document.getElementById('phoneNo').style.border = '2px solid red';
      flag = false;
    }
    if (allData.mailId == '') {
      document.getElementById('mailId').style.border = '2px solid red';
      flag = false;
    }
    if (allData.rollNo == '') {
      document.getElementById('rollNo').style.border = '2px solid red';
      flag = false;
    }
    if (allData.gender == '') {
      document.getElementById('gender').style.border = '2px solid red';
      flag = false;
    }
    if (allData.hostelName == '') {
      document.getElementById('hostelName').style.border = '2px solid red';
      flag = false;
    }
    if (allData.password == '') {
      document.getElementById('password').style.border = '2px solid red';
      flag = false;
    }
    if (allData.roomNo == '') {
      document.getElementById('roomNo').style.border = '2px solid red';
      flag = false;
    }
    if (allData.floorNo == '') {
      document.getElementById('floorNo').style.border = '2px solid red';
      flag = false;
    }
    if (allData.profilePic.size === 0) {
      document.getElementById('profilePic-outer-box').style.border = '2px solid red';
      flag = false;
    }

    if (flag) {
      setStoredFormData(formData);
      document.getElementById('outer-verification').style.display = 'flex';
      setLoading(true);
      const response = await fetch('https://api.howzellerz.store/api/v1/mailer/otpMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(allData),
        credentials: 'include'
      });
      if (response.ok) {
        alert('OTP sent to your mail');
        const otp = await response.json();
        setLoading(false);
        setOTP(otp.data);
      }
      setLoading(false);
    }
  }

  const createAccount = async (data) => {
    let flag = true;
    setLoading(true);
    const response = await fetch('https://api.howzellerz.store/api/v1/user/register', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if (!response.ok) {
      flag = false;
      if (response.status == 409) {
        alert('User already exists');
      }
      if (response.status == 400) {
        alert('Bad Request');
      }
    }
    if (flag) {
      window.location.href = '/home';
    }
    setLoading(false);
  }

  const verifyOTP = async (e) => {
    e.preventDefault();
    const otpInput = document.getElementById('otpInput').value;
    if (otpInput == otp) {
      document.getElementById('outer-verification').style.display = 'none';
      if (storedFormData) {
        await createAccount(storedFormData);
      }
    } else {
      alert('Invalid OTP');
    }
  }

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div id='most-outer-signup-box'>
        <div id='signup-box'>
          <div id='signup-box-logo'>
            <img src="logo/logo.jpg" alt="" />
          </div>
          <form onSubmit={handleSubmit} id='signup-form' encType='multipart/form-data'>
            <div className='signup-form-inputs'>
              <input id='name' type="text" name='name' placeholder='Enter your name' />
              <input id='mailId' type="email" name='mailId' placeholder='Enter your mail id' />
            </div>
            <div className='signup-form-inputs'>
              <input id='phoneNo' type="number" name='phoneNo' placeholder='Enter your phone number' />
              <input id='rollNo' type="number" name='rollNo' placeholder='Enter your roll number' />
            </div>
            <div className='signup-form-inputs'>
              <select id='hostelName' name="hostelName">
                <option value="">Select your hostel</option>
                <option value="Archimedes A">Archimedes A</option>
                <option value="Archimedes B">Archimedes B</option>
                <option value="Armstrong">Armstrong</option>
                <option value="Aristotle">Aristotle</option>
                <option value="Columbus">Columbus</option>
                <option value="Franklin A">Franklin A</option>
                <option value="Franklin B">Franklin B</option>
                <option value="IBN">IBN</option>
                <option value="Marcopolo">Marcopolo</option>
                <option value="Megalan">Megalan</option>
                <option value="Nightingale">Nightingale</option>
                <option value="Pie">Pie</option>
                <option value="Vasco">Vasco</option>
              </select>
              <select id='gender' name="gender">
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='signup-form-inputs'>
              <input id='roomNo' type="number" name='roomNo' placeholder='Enter your room number' />
              <input id='floorNo' type="number" name='floorNo' placeholder='Enter your floor number' />
            </div>
            <div className='signup-form-inputs'>
              <input id='password' type="password" name='password' placeholder='Enter your password' />
              <div id='profilePic-outer-box'>
                <label htmlFor="profilePic">Profile pic :</label>
                <input id='profilePic' type="file" name='profilePic' />
              </div>
            </div>
            <button type='submit' id='signup-btn'>Sign up</button>
          </form>
        </div>
        <Link to='/' id='checkIn-btn'>Check in</Link>
        <div id="outer-verification">
          <ul id="inner-verification">
            <li id="verify-ele1">
              <button id='add-broadcast-cross-btn' onClick={() => {
                document.getElementById("outer-verification").style.display = 'none'
              }}>
                <img src="icons/cross.svg" alt="" />
              </button>
            </li>
            <li id="verify-ele2">Verify your email first</li>
            <li id="verify-ele3">
              <form onSubmit={verifyOTP}>
                <input id='otpInput' type="text" placeholder='Enter OTP' />
                <button id='otpSubmitBtn' type='submit'>Verify</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SignUp
