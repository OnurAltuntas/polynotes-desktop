import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoards } from "../redux/actions/index";
import { addBoards } from "../redux/actions/index";
import { deleteBoards } from "../redux/actions/index";
import { editBoards } from "../redux/actions/index";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from "react-router-dom";
import _ from "lodash";
import firebaseConfig from "../../src/components/config/FbConfig";
import firebase from "firebase";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
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

class Boards extends Component {
  componentDidMount() {
    var temp = "gelir inş";
    var user = firebase.auth().currentUser;
    console.log(this.props.location.state.id);
    this.props.getBoards(this.props.location.state.id);
  }

  state = {
    empty: "",
    Visible: false,
    modalVisible: false,
    itemKey: "",
    title: "",
    boardKey:"",

    addState: {
      empty: "",
      modalVisible: false,
    },
  }; 

  handleOnClickToBoard = (boardKey) =>{
    console.log('#########'+boardKey);
    this.setState({boardKey:boardKey});
    
  }

  
  
 

   handleOnChange = (e) => {
    this.setState({
      title: e.target.value
    });

    console.log('$$$$$$$$$'+this.state.title);
  };

  editHandler = (_itemKey) => {
    this.setState({Visible: true});
    this.setState({itemKey: _itemKey});
    console.log('$$$$$$$$$$$$$$$$' + _itemKey);

    //this.props.navigation.navigate('EditScreen');
  };

  render() {
    if (this.state.boardKey!=="")
    return (
      <Redirect
        to={{
          pathname: "/Trello",
          state: { id: this.state.boardKey },
        }}
      />
    );

    console.log(this.props.location.state);
    if (this.props.boardsList) {
      var temp = Object.values(this.props.boardsList);
      console.log(temp);
      return (
        <div>
          <h1>Boards Page</h1>
          {temp.map((item) => (
            <div>
              <h3
              onClick={() => this.handleOnClickToBoard(item.key)} 
              >{item.title}</h3>

              <Fab color="secondary" aria-label="edit">
              <EditIcon
              data-toggle="modal" data-target="#exampleModal"
              onClick={() => this.editHandler(item.key)}
              />
            </Fab>

            <Fab color="secondary" aria-label="delete">
              <DeleteIcon
              onClick={() => this.props.deleteBoards(item.key)}
              />
            </Fab>
            </div>
          ))}

          <Fab color="primary" aria-label="add"  data-toggle="modal" data-target="#exampleModal">
          <AddIcon />
        </Fab>

      


<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="title"
      label="title"
      name="title"
      autoComplete="title"
      autoFocus
      onChange={this.handleOnChange}
     
    />
   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal"
        onClick={() => {
          this.props.editBoards(
            this.state.title,
            this.state.itemKey,
          );
          this.setState({title: ''});
          this.setState({Visible: false});
        }}
        >Edit Board</button>
        <button type="button" class="btn btn-primary"
        onClick={()=>{ this.props.addBoards(
          this.state.title,
        );
          this.setState({title:''});
      }}
        >Add Board</button>
      </div>
    </div>
  </div>
</div>
        </div>
      );
    }
    //console.log(this.props.boardsList);
    return (
      <div>
        <h1>Boards Page</h1>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
    const boardsList = _.map(state.boardsList.boardsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    boardsList: boardsList
  };
}
export default connect(mapStateToProps, { getBoards, addBoards,editBoards,deleteBoards })(Boards);
