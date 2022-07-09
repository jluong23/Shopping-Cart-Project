import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/navbar";
import './styling.css';
import DailySong from "./pages/DailySong";
import React, { useState } from 'react';

const App = () => {
  const [navBarHidden, setNavBarHidden] = useState(false);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {navBarHidden ? null: <Navbar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home setNavBarHidden={setNavBarHidden}/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path="/dailysong" element={<DailySong />} />
        </Routes>
      </div>

      <footer>
        Created by James Luong (2022)
      </footer>

    </BrowserRouter>
  );
};

export default App;