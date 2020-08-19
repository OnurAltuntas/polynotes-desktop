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
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NoteIcon from '@material-ui/icons/Note';
import user from "./../../assets/user.png";



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

  list: {
    width: 250,
    backgroundColor:"red"
  },
  fullList: {
    width: 'auto',
    backgroundColor:"red"
  },
}));

export default function Navi() {
    const [currentUser, setcurrentUser] = useState("");
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const classes = useStyles();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setcurrentUser(user);
      }
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <div 
      
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >  
      <List >
      <ListItem  >
           <img src={user} alt="profile" className="profile"></img>
         
          </ListItem>

          <ListItem  >
          <h6>{currentUser.email}</h6>
         
        
         </ListItem>
         <ListItem  >
         <h6 style={{visibility:"Hidden"}}>onuraltuntas50@gmail.com</h6>
        
       
        </ListItem>
       
      </List>
        <Divider />
      
        <List>
        <ListItem >
              <ListItemIcon> <NoteIcon /></ListItemIcon>
              <Link href="/SignUp"> Notes</Link>
            </ListItem>

           
         
        </List>
      </div>
    );

  

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

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer  anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      
       
      </IconButton>

      <Link style={{textDecoration:"none",color:"#fff"}} to="/" >
      <h2>Polynotes</h2>
      </Link>

      <Typography variant="h4" className={classes.title}>
      <Link style={{textDecoration:"none",color:"#fff"}} to="/" >
  
      </Link>
      </Typography>
      <h1 > {links} </h1>
    </Toolbar>

   

      </AppBar>
    );
  
}
