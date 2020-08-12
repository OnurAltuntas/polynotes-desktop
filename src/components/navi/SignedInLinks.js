import React, { Component,useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logout from "../../assets/logout.png";
import signup from "../../assets/signup.png";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

 function SignedInLinks() {
  const [userStatus, setuserStatus] = useState(false);


  const signOutHandler = () =>{
    firebase.auth().signOut().then(function() {
      setuserStatus(true);
    }).catch(function(error) {
     console.log('hata sign out ');
    });
  }

 if(userStatus===true) return <Redirect to="/SignIn" />;
    
    return (
      <ul className="right">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={signOutHandler}

      >
        <img src={logout} alt="login" height="30" width="30"></img>
      </IconButton>
     
    </ul>
    )
 
}



export default SignedInLinks;
