import React, { Component } from 'react'
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import login from "../../assets/login.png";
import signup from "../../assets/signup.png";
import { Redirect } from "react-router-dom";


export default class SignedOutLinks extends Component {
  render() {
    return (
      <div >
     
      <Link to="/SignUp" >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={signup} alt="login" height="40" width="40"></img>
         
        </IconButton>
      </Link>

      <Link to="/SignIn">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={login} alt="login" height="40" width="40"></img>{" "}
       
        </IconButton>
      </Link>
  
      </div>
    )
  }
}
