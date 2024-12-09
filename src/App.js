// src/App.js
import React from 'react';
import TypingTest from './TypingTest';
import './styles.css';

function App() {
  return (
    <div className="App">
      {/* Update the src path to your new logo image */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Typo Test Logo" className="app-logo" />
      <TypingTest />
      <h1 className="app-name">Typo Ninja</h1>

    </div>
    
  );
}

export default App;
