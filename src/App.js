import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/navbar";
import './styling.css';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;