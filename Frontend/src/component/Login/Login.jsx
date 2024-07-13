import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const toregister = () =>{
    navigate('/register');
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login_page_container">
        
        <div className="login_page_main_body">
          <div className="login">
            <div className="login_container">
              <p>Login</p>
              <div className="login_input_box">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email id" />
                <label htmlFor="password">Password</label>
                <div className="password_container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="password"
                  />
                  <div className="login_eye_icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <a href="#">Forgot Password?</a>
              </div>
              <div className="login_buttons">
                <button className="Login">Login</button>
                <button className="sign_up" onClick={toregister}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;