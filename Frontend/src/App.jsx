import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import FirstPage from './component/First_page/First_page';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav>
        <h3>Question Paper Generator</h3>
      </nav>
      <div className="component-wrapper">
        <TransitionGroup className="transition-group">
          <CSSTransition key={location.key} timeout={400} classNames="fade">
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <footer className="first_page_footer">
        <h3>Copyright</h3>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
