import React,{useEffect} from 'react';
import logo from './../../logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'



function App() {

  return (
    <div>
        <h1>Home page</h1>
       
        <Link to="/SignIn">SignIn</Link>

        <div>

        </div>
      </div>
  );
}

export default App;
