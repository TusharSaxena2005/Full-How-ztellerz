import React, { useState, useEffect } from 'react'
import './Login.css'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const Login = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('https://full-how-ztellerz.onrender.com/api/v1/user/current-user', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        window.location.href = '/home'; 
      }
    } catch (error) { }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let flag = true;
    const formData = new FormData(e.target);
    let allData = Object.fromEntries(formData.entries());
    if (allData.rollNo == '' || allData.password == '') {
      document.getElementById('login-rollno').style.borderColor = 'red';
      document.getElementById('login-password').style.borderColor = 'red';
      flag = false;
    }
    if (flag) {
      const response = await fetch('https://full-how-ztellerz.onrender.com/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(allData),
        credentials: 'include'
      });
      if (response.ok) {
        window.location.href = '/home';
      }
      else if(response.status == 401) {
        alert('Invalid Roll Number or Password');
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Loader />
      )}
      <div id='most-outer-login-box'>
        <div id='outer-login-box'>
          <div id='login-box'>
            <div id='login-box-logo'>
              <img src="logo/logo.jpg" alt="" />
            </div>
            <form onSubmit={handleLogin} id='login-form' encType='multipart/form-data'>
              <input id='login-rollno' type="number" name='rollNo' placeholder='Enter your roll number' />
              <input id='login-password' type="password" name='password' placeholder='Enter your password' />
              <button type='submit' id='login-btn'>Login</button>
            </form>
          </div>
          <Link to='/signup' id='freshie-login-btn'>Freshie</Link>
        </div>
      </div>
    </>
  )
}

export default Login
