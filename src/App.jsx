import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home"; // Aapka naya Home page
import PortfolioPage from "./pages/PortfolioPage"; // Portfolio page
import './App.css';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Portfolio Page */}
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default App;