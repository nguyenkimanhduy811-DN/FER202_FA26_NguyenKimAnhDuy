import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";


import MyCarousel from "./components/MyCarousel";

import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
         <MyCarousel />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;