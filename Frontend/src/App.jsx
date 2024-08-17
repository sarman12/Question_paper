import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import FirstPage from './component/First_page/First_page';
import Dashboard from './component/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav>
          <h3>Question Paper Generator</h3>
        </nav>
        <div className="component-wrapper">
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <footer className="first_page_footer">
          <h3>Copyright © 2024 Question Paper Generator</h3>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <div className="not-found"><h2>Page Not Found</h2></div>;
}

export default App;
