import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/Boards">SignIn</Link>
      </div>
    );
  }
}
