import React, { useState, useEffect } from 'react'
import './Login.css'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) window.location.href = '/home';
  }, []);

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
      setLoading(false);
      return;
    }

    if (flag) {
      try {
        const response = await fetch('https://api.howzellerz.store/api/v1/user/login', {
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
        } else if (response.status == 401) {
          alert('Invalid Roll Number or Password');
        } else {
          alert('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Network error. Please try again.');
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
