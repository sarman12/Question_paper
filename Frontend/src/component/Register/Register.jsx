import React, { useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="Register_page_container">
        
        <div className="Register_page_main_body">
          <div className="Register">
            <div className="Register_container">
              <p>Register</p>
              <div className="input_box">
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
                  <div className="eye_icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <label htmlFor="">Confirm Password</label>
                <div className='password_container'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Confirm your password"
                    className="password"
                  />
                </div>
              </div>
              <div className="buttons">
                <button className="register">Register</button>
                <button className="sign_up">Sign up</button>
              </div>
              <div className="separator">
                -----------------or------------------
              </div>
              <div className="social">
                <FaGoogle className="google" />
                <FaFacebook className="facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;