import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import WofGame from './Page/WofGame';
import {Routes, Route} from "react-router-dom";
import LoginPage from './Page/LoginPage';
import Wheel from './Page/Wheel';

function HangmanGame() {


  return (
    <>
      <Routes>
      <Route path='/' element={<LoginPage />} exact/>
      <Route path='/wheel' element={<Wheel />} exact/>
      <Route path='/game' element={<WofGame />}/>
    </Routes>
    </>

    
  );
}
export default HangmanGame;
