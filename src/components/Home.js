import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import leftCard from "./../assets/polynotes-cards2.png";
import phone from "./../assets/phone.png";


function Home() {
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
    <div className="board" >
    <div >
    <div >
      <div class="container pt-7 pb-6 text-white">
        <div class="row align-items-center text-center text-md-left">
          <div class="col-lg-5">
            {" "}
            <h1>
              Polynotes, daha fazla işbirliği içerisinde çalışmanıza ve daha
              fazla iş yapmanıza izin verir.
            </h1>
            <p class="lead">
              Polynotes'un panoları, listeleri ve kartları, projelerinizi
              eğlenceli, esnek ve ödüllendirici bir yolla organize etmenizi ve
              önceliklendirmenizi sağlar.
            </p>
          </div>
          <div class="col-lg-6 offset-lg-1">
            <img
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg"
              width="582"
              class="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    <div style={{marginTop:50}}>
    <div class="container pt-7 pb-6 text-white">
    <div class="row align-items-center text-center text-md-left">
      <div class="col-lg-5">

      <img className = "laptop-style" src={phone} alt="Framer dribbble" height="400px" />
      
      </div>
      <div class="col-lg-6 offset-lg-1"> <h1 class="mt-3 mt-md-0">Tek bakışta bilgiler</h1> <p class="lead">Yorumlar, ekler, bitiş tarihleri ve daha fazlasını doğrudan Polynotes kartlarına ekleyerek detaylara dalın. Projelerde baştan sona işbirliği yapın.</p> </div>
      </div>
    </div>
    </div>

   
    
    
    <div style={{marginTop:50}}>
    <div class="container pt-7 pb-6 text-white">
    <div class="row align-items-center text-center text-md-left">
      <div class="col-lg-5">
        {" "}
        <h1>
          Polynotes, çoklu platformlarda çalışmanıza izin verir. Masaüstü, mobil ve web sürümleri
          sayesinde her yerden kolaylıkla erişebilirsiniz.
        </h1>
        <p class="lead">
          Polynotes mobil uygulamasını google play market ve apple store'dan indirebilirsiniz.
        </p>
      </div>
      <div class="col-lg-6 offset-lg-1">
              <img className = "laptop-style" src="https://static.dribbble.com/users/161143/screenshots/3459600/framer-dribbble.gif" alt="Framer dribbble" height="400px" />
        </div>
      </div>
    </div>
    </div>

    <div style={{marginTop:50}}>
    <p class="app-store"> <a href="#">
    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/eebf313cb223112b503b7322173b013c/btn-appstore-black.png" class="img-fluid" alt="App Store'da Mevcut" />
    </a> 
    <a style={{marginLeft:20}} href="#">
    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/bcde9868a665af4ab4efe460c46fbc7b/btn-playstore-black.png" class="img-fluid" alt="Google Play'de Android Uygulaması"/>
    </a>
    </p>

    </div>
      &nbsp;© Copyright 2020. Tüm hakları saklıdır. 
    
    


    </div>
  );
}

export default Home;
