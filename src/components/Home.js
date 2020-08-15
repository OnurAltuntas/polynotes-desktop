import React, { Component,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

function Home () {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setcurrentUser(user.uid);
      }
    });

    
  }, []);

  const [currentUser, setcurrentUser] = useState("");

  if (currentUser)
    return (
      <Redirect
        to={{
          pathname: "/Boards",
          state: { id: currentUser },
        }}
      />
    );

  
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/Boards">Boards</Link>
      </div>
    );

}

export default Home;
