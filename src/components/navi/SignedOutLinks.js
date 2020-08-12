import React, { Component } from 'react'
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import login from "../../assets/login.png";
import signup from "../../assets/signup.png";

export default class SignedOutLinks extends Component {
  render() {
    return (
      <div>
      <ul className="right">
      <Link to="/SingUp" style={{ textDecoration: "none", color: "white" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          //onclick signup çağır
        >
          <img src={signup} alt="login" height="30" width="30"></img>
          <h2>signup</h2>
        </IconButton>
      </Link>

      <Link to="/SignIn" style={{ textDecoration: "none", color: "white" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={login} alt="login" height="30" width="30"></img>{" "}
          <h2>Login</h2>
        </IconButton>
      </Link>
    </ul>
      </div>
    )
  }
}
