import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import MainPage from "./domain/MainPage";

function App() {
  return (
      <BrowserRouter>
        <MainPage/>
      </BrowserRouter>
  );
}

export default App;
