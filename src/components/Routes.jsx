import React from "react";
import "../styles/Main.css";
import Board from "./Board";
import { Route, BrowserRouter as Router, Routes, BrowserRouter } from 'react-router-dom';
import Home from "../components/Home";
import Main from "../components/Main";
import Instruction from "../components/Instruction";
import Header from "../router/header";


const GameRoutes = () => {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/homepage" element = {<Home/>}></Route>
        <Route path="/gameplay" element = {<Main/>}></Route>
        <Route path='/instruction' element = {<Instruction/>}></Route>
    </Routes>
    </BrowserRouter>

  );
};

export default GameRoutes;