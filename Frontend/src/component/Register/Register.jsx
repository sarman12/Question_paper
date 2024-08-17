import React, { useState } from 'react';
import './Register.css';
import {FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate('/login');
      } else {
        console.error('Error registering:', response.statusText);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Register_page_container">
      <div className="Register_page_main_body">
        <div className="Register">
          <div className="Register_container">
            <p>Register</p>
            <form onSubmit={handleSubmit}>
              <div className="input_box">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="password_container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="password_container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirm-password"
                    placeholder="Confirm your password"
                    className="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="buttons">
                <button type="submit" className="register">Register</button>
                <button type="button" onClick={() => navigate('/login')} className="sign_up">Sign in</button>
              </div>
            </form>
            <div className="separator">
              <span>-----------------or------------------</span>
            </div>
            <div className="social">
                <FaGoogle /> 
                <FaFacebook /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
