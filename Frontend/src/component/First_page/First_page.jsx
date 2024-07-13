import React from 'react';
import './First_page.css';

function First_page({ onGetStarted }) {
  return (
    <div className="overall">
      <div className="first_page_body">
          <div className="first_page_label">
            <h1>Make it easier than it used to be</h1>
            <h2>Create questions paper effortlessly, Sign up now and make pdfs effortlessly</h2>
            <button onClick={onGetStarted}>Get Started</button>
          </div>
      </div>
      {/*  */}
    </div>
  );
}

export default First_page;
