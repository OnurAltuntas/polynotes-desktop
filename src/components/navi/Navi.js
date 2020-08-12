import React, {useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import firebase from "firebase";
import  logo  from "../../assets/mirket-icon-fixed.png";

export default function Navi() {
    const [currentUser, setcurrentUser] = useState("");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          setcurrentUser(user);
        }
      });

    const links = currentUser ? (
        <SignedInLinks/>
      ) : (
        <SignedOutLinks />
      );
    return (
      <AppBar style={{ background: "#2E3B55" }} position="static">
        <Toolbar>
        <h1>Navi</h1>
          <div class="container">
            <div class="row no-gutters">
              <div class="col-12 col-sm-6 col-md-10">
                {" "}
                <img src={logo} alt="logo" height="120" width="263"></img>
              </div>
              <div class="col-6 col-md-2"> {links} </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  
}
