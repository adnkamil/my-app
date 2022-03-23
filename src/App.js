import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meals from "./component/Meals/meals";
import Nav from "./component/Navbar/nav";
import About from "./component/About/about";
import MealList from "./component/Meals/mealList";
import Latihan from "./component/useEffectcontoh";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="about" element={<About />} />
          <Route path="list/:category" element={<MealList />} />
          <Route path="latihan/*" element={<Latihan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
