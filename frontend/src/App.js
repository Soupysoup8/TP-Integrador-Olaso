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
import FormProduct from "./components/registerEntities/FormProduct";
import FormClient from "./components/registerEntities/FormClient";
import FormSupplier from "./components/registerEntities/FormSupplier";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registerEntities" element={<RegisterStuffPage />} />
        <Route path="/registerEntities/product" element={<FormProduct />}></Route>
        <Route path="/registerEntities/client" element={<FormClient />}></Route>
        <Route path="/registerEntities/supplier" element={<FormSupplier />}></Route>
        <Route path="/registerMovements" element={<RegisterMovementsPage />} />
        <Route path="/allMovements" element={<AllMovementsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;