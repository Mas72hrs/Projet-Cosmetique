import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import InPage from "./In-Page/InPage";
import LoginPage from "./LoginPage/LoginPage";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role: "",
    status: false,
  });
  return (
    <Router>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="App outfit">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/inpage/*" element={<InPage />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
