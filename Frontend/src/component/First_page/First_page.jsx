import React from 'react';
import { useNavigate } from 'react-router-dom';
import './First_page.css';

function FirstPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="overall">
      <div className="first_page_body">
        <div className="first_page_label">
          <h1>Make it easier than it used to be</h1>
          <h2>Create questions paper effortlessly, Sign up now and make pdfs effortlessly</h2>
          <button onClick={handleRegister}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
