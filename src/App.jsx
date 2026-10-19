import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home"; 
import PortfolioPage from "./pages/PortfolioPage"; // Portfolio 
import Footer from './components/Footer';
import PhotoSpecificPerson from "./pages/PhotoSpecificPerson"; 

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


       <Route path="/project/:id" element={<PhotoSpecificPerson />} /> 
      </Routes>


      <Footer/>
    </>
  );
}

export default App;