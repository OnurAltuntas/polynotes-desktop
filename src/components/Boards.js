import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoards } from "../redux/actions/index";
import { addBoards } from "../redux/actions/index";
import { deleteBoards } from "../redux/actions/index";
import { editBoards } from "../redux/actions/index";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import firebase, { database } from "firebase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import alertify from "alertifyjs";

class Boards extends Component {
  componentDidMount() {
    var temp = "gelir inş";
    var user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getBoards(user.uid);
      }
    });
  }

  state = {
    empty: "",
    Visible: false,
    modalVisible: false,
    itemKey: "",
    title: "",
    boardKey: "",
    currentUserId: "",
    editBoardHidden: true,

    addState: {
      empty: "",
      modalVisible: false,
    },
  };

  handleOnClickToBoard = (boardKey) => {
    console.log("#########" + boardKey);
    this.setState({ boardKey: boardKey });
  };

  handleOnChange = (e) => {
    this.setState({
      title: e.target.value,
    });

    console.log("$$$$$$$$$" + this.state.title);
  };

  editHandler = (_itemKey) => {
    this.setState({ Visible: true });
    this.setState({ itemKey: _itemKey });
    console.log("$$$$$$$$$$$$$$$$" + _itemKey);

    //this.props.navigation.navigate('EditScreen');
  };

  render() {
    if (this.state.boardKey !== "")
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
          <div>
            <h2 className="boardsPage-style">
              Boards Page{" "}
              <Fab
                style={{
                  backgroundColor: "#FFB500",
                  width: "45px",
                  height: "45px",
                }}
                aria-label="add"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                {" "}
                <AddIcon />
              </Fab>
            </h2>
          </div>

          {temp.map((item) => (
            <div className="listItems">
            
              <div
                className="card2"
              
              >
              <img   src="https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&amp;fit=crop&amp;w=750&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"/>
              
             
           
              <div onClick={() => this.handleOnClickToBoard(item.key)} className="go-corner">
               <div   className="go-arrow">→</div> 
               </div>

               
               <div style={{opacity:0.9}}>
               <h3 style={{color:"#fff"}}> {item.title}</h3>
               </div>

                <Fab
                style={{
                  backgroundColor: "#FFB500",
                  width: "45px",
                  height: "45px",
                  marginLeft: 10,
                }}
                color="secondary"
                aria-label="edit"
              >
                <EditIcon
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => this.editHandler(item.key)}
                />
              </Fab>

              <Fab
                style={{
                  backgroundColor: "#FFB500",
                  width: "45px",
                  height: "45px",
                  marginLeft: 10,
                }}
                color="secondary"
                aria-label="delete"
              >
                <DeleteIcon
                  onClick={() => this.props.deleteBoards(item.key)}
                />
              </Fab>
                
                </div>
             
            </div>
          ))}

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add Board
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
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
                  <button
                    style={{ backgroundColor: "#FFB500" }}
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      this.props.editBoards(
                        this.state.title,
                        this.state.itemKey
                      );
                      this.setState({ title: "" });
                      this.setState({ Visible: false });
                    }}
                  >
                    Edit Board
                  </button>
                  <button
                    style={{ backgroundColor: "#FFB500" }}
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      if (this.state.title === "") {
                        alertify.notify(
                          "Please dont leave empty area!",
                          "custom",
                          2,
                          function () {}
                        );
                      } else {
                        this.props.addBoards(this.state.title);
                      }
                      this.setState({ title: "" });
                      this.setState({ Visible: false });
                    }}
                  >
                    Add Board
                  </button>
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
        <h2  className="boardsPage-style" >Boards Page</h2>
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
    boardsList: boardsList,
  };
}
export default connect(mapStateToProps, {
  getBoards,
  addBoards,
  editBoards,
  deleteBoards,
})(Boards);
