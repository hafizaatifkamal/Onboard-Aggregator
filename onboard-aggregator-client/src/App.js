import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UsersList from "./components/UsersList";
import Navbar from "./components/Navbar";
import UserCreate from "./components/UserCreate";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersList />}></Route>
          <Route path="/create" element={<UserCreate />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
