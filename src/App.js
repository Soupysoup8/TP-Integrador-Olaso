import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterStuffPage from "./pages/RegisterEntities";
import RegisterMovementsPage from "./pages/RegisterMovementsPage";
import InventoryPage from "./pages/InventoryPage";
import AllMovementsPage from "./pages/AllMovementsPage";
import HomePage from "./pages/Home";

import './styles/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registerEntities" element={<RegisterStuffPage />} />
        <Route path="/registerMovements" element={<RegisterMovementsPage />} />
        <Route path="/allMovements" element={<AllMovementsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;