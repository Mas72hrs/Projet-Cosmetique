import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import InPage from './In-Page/InPage';
import LoginPage from './LoginPage/LoginPage';



function App() {
  return (
    <Router>
    <div className="App outfit"> 
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/inpage/*" element={<InPage />} />
      </Routes>  
    </div>
    </Router>
  );
}

export default App;
