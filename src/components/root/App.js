import React, { useEffect } from "react";
import logo from "./../../logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Boards from "../Boards";
import Trello from "../Trello";
import Home from "../Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Navi from "../navi/Navi";

function App() {
  return (
    <div className="App">
    <Navi/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Boards" exact component={Boards} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/Trello" exact component={Trello} />
      </Switch>
    </div>
  );
}

export default App;
