import React, {useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import  logo  from "../../assets/mirket-icon-fixed.png";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft:20
  },
}));

export default function Navi() {
    const [currentUser, setcurrentUser] = useState("");
    const classes = useStyles();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setcurrentUser(user);
        }
      });

    const links = currentUser ? (
        <SignedInLinks/>
      ) : (
        <SignedOutLinks />
      );

      // img logo src yok!! ufak bi logo olabilir
    return (
      <AppBar style={{ background: "#FFB500",height:"75px" }} position="static">
      <Toolbar >
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h4" className={classes.title}>
      <Link style={{textDecoration:"none",color:"#fff"}} to="/" >
      Polynotes 
      </Link>
      </Typography>
      <h1 > {links} </h1>
    </Toolbar>
      </AppBar>
    );
  
}
