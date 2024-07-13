import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/dashboard'); // Replace with your actual route
      } else {
        console.error('Error logging in:', response.statusText);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="login_page_container">
        <div className="login_page_main_body">
          <div className="login">
            <div className="login_container">
              <p>Login</p>
              <form onSubmit={handleLogin}>
                <div className="login_input_box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <div className="password_container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="login_eye_icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="login_buttons">
                  <button type="submit" className="login">Login</button>
                  <button type="button" className="sign_up" onClick={toRegister}>Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
