import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import PageController from "./domain/PageController";

function App() {
  return (
      <BrowserRouter>
        <PageController/>
      </BrowserRouter>
  );
}

export default App;
