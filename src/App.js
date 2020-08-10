import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import SignIn from './components/auth/SignIn';

function App() {
  return (
    <div>
        <h1>Home page</h1>
       <SignIn/>
        <div>
         
        </div>
      </div>
  );
}

export default App;
