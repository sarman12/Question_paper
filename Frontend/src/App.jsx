import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import FirstPage from './component/First_page/First_page';
import './App.css';

function App() {
  const [mode, setMode] = useState('first_page');

  const handleGetStarted = () => {
    setMode('login');
  };

  const renderComponent = () => {
    switch (mode) {
      case 'login':
        return <Login setMode={setMode} />;
      case 'register':
        return <Register setMode={setMode} />;
      case 'first_page':
      default:
        return <FirstPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="app-container">
      <nav>
        <h3>Question Paper Generator</h3>
      </nav>
      <TransitionGroup className="transition-group">
        <CSSTransition key={mode} timeout={400} classNames="slide">
          <div className="component-wrapper">{renderComponent()}</div>
        </CSSTransition>
      </TransitionGroup>
      <footer className="first_page_footer">
        <h3>Copyright</h3>
      </footer>
    </div>
  );
}

export default App;
