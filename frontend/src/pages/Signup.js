import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import './Signup.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = `${APIUrl}/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-box" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <p>Sign up to manage your expenses</p>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={signupInfo.name}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="signup-button">Sign Up</button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
