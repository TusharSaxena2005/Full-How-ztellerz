import React from 'react'
import './Login.css'

const Login = () => {

  const handleLogin = async (e) => {
    e.preventDefault();
    let flag = true;
    const formData = new FormData(e.target);
    let allData = Object.fromEntries(formData.entries());
    if (allData.rollNo === '' || allData.password === '') {
      document.getElementById('login-rollno').style.borderColor = 'red';
      document.getElementById('login-password').style.borderColor = 'red';
      flag = false;
    }
    const response = await fetch('http://localhost:8000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(allData),
      credentials: 'include'
    });
    if (response.ok) {
      console.log(response.json());
       window.location.href = '/explore';
    }
  };
  return (
    <>
      <div id='outer-login-box'>
        <div id='login-box'>
          <form onSubmit={handleLogin} encType='multipart/form-data'>
            <input id='login-rollno' type="text" name='rollNo' placeholder='Enter your roll number' />
            <input id='login-password' type="password" name='password' placeholder='Enter your password' />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
