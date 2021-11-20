import React from "react";
import "../styles/Boards.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Boards from "../components/Boards";
import Instruction from "../components/Instruction";
import Header from "../components/Header";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Instruction />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/gameplay" element={<Boards />} />
        <Route path="/instruction" element={<Instruction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
