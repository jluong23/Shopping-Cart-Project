import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/navbar";
import './styling.css';
import DailySong from "./pages/DailySong";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dailysong" element={<DailySong />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;