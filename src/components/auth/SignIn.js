import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import fbConfig from "../config/FbConfig";
import { red } from "@material-ui/core/colors";
import alertify from "alertifyjs";


function SignIn({ auth }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setcurrentUser(user.uid);
      }
    });
  }, []);

  const classes = useStyles();
  const [UserInfos, setUserInfos] = useState({ email: "", password: "" });
  const [userStatus, setuserStatus] = useState("");
  const [currentUser, setcurrentUser] = useState("");

  const handleOnChange = (e) => {
    setUserInfos({
      ...UserInfos,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(UserInfos.email, UserInfos.password)
      .then(function (result) {
      })
      .catch(function (error) {
        alertify.notify(
          error,
          "custom",
          2,
          function () {}
        );
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (firebase.auth().currentUser.uid) {
          setuserStatus(firebase.auth().currentUser.uid);
        }
      }
    });
  };

  if (userStatus) return <Redirect to="/Boards" />;
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
    <div style={{backgroundColor:red}}>
    <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signin
        </Typography>
        <form className={classes.form} noValidate>
          <TextField style={{backgroundColor:"#fafafa",borderRadius:10}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleOnChange}
          />
          <TextField style={{backgroundColor:"#fafafa",borderRadius:10}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleOnChange}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
            style={{backgroundColor: '#30698C',
          }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <Link href="/SignUp">You have an account signup now </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>

  );
}
//primary hex code #2E3B55
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:"#FFC845",
    padding: 20,
    borderRadius: 10,
    opacity: 0.8
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#30698C',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#30698C',
  
    
  },
}));

export default SignIn;
