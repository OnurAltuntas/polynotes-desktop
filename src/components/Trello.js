import React, { Component } from "react";
import { getTodos } from "../redux/actions/index";
import { getInProgress } from "../redux/actions/index";
import { getDones } from "../redux/actions/index";
import { addTodos } from "../redux/actions/index";
import { deleteTodos } from "../redux/actions/index";
import { addTasks } from "../redux/actions/index";

import { todosToInProgress } from "../redux/actions/index";
import { InProgressToTodos } from "../redux/actions/index";
import { InProgressToDone } from "../redux/actions/index";
import { DoneToInProgress } from "../redux/actions/index";
import { TodosToDone } from "../redux/actions/index";
import { DoneToTodos } from "../redux/actions/index";

import firebase from "firebase";
import _ from "lodash";
import { connect } from "react-redux";
import "./root/App.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowRight from "@material-ui/icons/ArrowRight";
import AddIcon from "@material-ui/icons/Add";
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
import Fab from "@material-ui/core/Fab";
import alertify from "alertifyjs";

class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      todosStatus: true,
      wipStatus: true,
      donesStatus: true,

      loadwithstart: true,

      empty: "",
      Visible: false,
      modalVisible: false,
      itemKey: "",
      title: "",
      boardKey: "",
      currentUserId: "",

      addState: {
        empty: "",
        modalVisible: false,
      },
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getTodos(this.props.location.state.id, user.uid);
        this.props.getInProgress(this.props.location.state.id, user.uid);
        this.props.getDones(this.props.location.state.id, user.uid);
        this.setState({ currentUserId: user.uid });
        this.setState({ boardKey: this.props.location.state.id });
        this.setState({loadwithstart:true})
      }
    });
  }

  componentWillUpdate(){
        console.log(this.props.donesList);
      
    }

  //this.setState({tasks:[]})

  loadWithStart = () => {
    console.log("loadWithStart");
    if (this.state.todosStatus) {
      if (this.props.todosList) {
        for (let i = 0; i < Object.values(this.props.todosList).length; i++) {
          this.state.tasks.push({
            name: this.props.todosList[i].empty,
            key: this.props.todosList[i].key,
            category: "todos",
            bgcolor: "skyblue",
          });
        }
        this.setState({ todosStatus: false });
      }
    }
    if (this.state.wipStatus) {
      console.log("girsin artık");
      if (this.props.InProgressList) {
        var counter = 0;
        var inprogressLength = Object.values(this.props.InProgressList).length;
        for (let el of Object.values(this.props.InProgressList)) {
          this.state.tasks.push({
            name: el.empty,
            key: el.key,
            category: "wip",
            bgcolor: "pink",
          });
        }
        this.setState({ wipStatus: false });
      }
    }

    if (this.state.donesStatus) {
      console.log(this.props.donesList);
    
      if (this.props.donesList) {
        var counter = 0;
        var donesLength = Object.values(this.props.donesList).length;
        for (let el of Object.values(this.props.donesList)) {
          this.state.tasks.push({
            name: el.empty,
            key: el.key,
            category: "dones",
            bgcolor: "#C7EE95",
          });
        }
      }
      this.setState({ donesStatus: false });
    }
    console.log(this.state.tasks);


  };

  handleOnChange = (e) => {
    this.setState({
      title: e.target.value,
    });

    console.log("$$$$$$$$$" + this.state.title);
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
    console.log("başladı");
  };

  onDragOver = (ev) => {
    ev.preventDefault();
    console.log("üstünde");
  };

  onDrop = (ev, cat) => {
    console.log("bitti");

    let id = ev.dataTransfer.getData("id");
    console.log(id);
    console.log(cat);


    let tasks = this.state.tasks.filter((task) => {
      if (task.key == id) {
        console.log(task.category);

        if(task.category==='todos' && cat==='wip'){
          console.log("girmesi lazım");
          this.props.todosToInProgress(task.name,this.state.boardKey,task.key);
        task.category = cat;

        }
        else if(task.category==='wip' && cat==='dones'){

          this.props.InProgressToDone(task.name,this.state.boardKey,task.key);
          task.category = cat;
        }

        console.log("taskKey:" + task.key);
      }

      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
    
    this.setState({ todosStatus: true });
    this.setState({ wipStatus: true });
    this.setState({ donesStatus: true });

    //this.props.addTasks(this.state.tasks,this.state.boardKey,this.state.currentUserId);
  };

  handleDeleteTodos = (taskKey) => {
    this.props.deleteTodos(
      this.state.boardKey,
      taskKey,
      this.state.currentUserId
    );

    let tasks = this.state.tasks.filter((task) => {
      return task.key !== taskKey;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  handleAddTodos = () => {};

  render() {
    var tasks = {
      wip: [],
      todos: [],
      dones: [],
    };

    this.state.tasks.forEach((t) => {
      if (t.category === "wip") {
        tasks.wip.push(
          <div
            key={t.key}
            onDragStart={(e) => this.onDragStart(e, t.key)}
            draggable
            className="draggable"
            style={{ backgroundColor: t.bgcolor }}
          >
            <h4>{t.name}</h4>
          </div>
        );
      } else if (t.category === "todos") {
        tasks.todos.push(
          <div
            className="card2"
            key={t.key}
            onDragStart={(e) => this.onDragStart(e, t.key)}
            draggable
            className="draggable"
            style={{ backgroundColor: t.bgcolor }}
          >
            <Fab
              style={{
                backgroundColor: "#FFB500",
                width: "45px",
                height: "45px",
                float: "right",
              }}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon onClick={() => this.handleDeleteTodos(t.key)} />
            </Fab>

           
            <h4>{t.name}</h4>
          </div>
        );
      } else if (t.category ==="dones") {
        tasks.dones.push(
          <div
            key={t.key}
            onDragStart={(e) => this.onDragStart(e, t.key)}
            draggable
            className="draggable"
            style={{ backgroundColor: t.bgcolor }}
          >
            <h4>{t.name}</h4>
          </div>
        );
      } else {
        return <div></div>;
      }
    });

    return (
      <div className="container-drag">
        <div>
          <h2 className="trelloPage-style">
            Trello Page
            <h2
              onClick={() => {
                this.loadWithStart();
              }}
            >
              Load
            </h2>
            <h2
            onClick={() => {
             window.location.reload();
             //this.loadWithStart();
            }}
          >
            refresh
          </h2>
          </h2>
        </div>

        <div
          className="column"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "todos")}
        >
          <span className="task-header">
            <h4
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Todos
              <Fab
                style={{
                  backgroundColor: "#FFB500",
                  width: "45px",
                  height: "45px",
                  float: "right",
                  top: 0,
                  marginRight: 10,
                }}
                aria-label="add"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                {" "}
                <AddIcon />
              </Fab>
            </h4>
          </span>

          {tasks.todos}
        </div>

        <div
          className="column"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => {
            this.onDrop(e, "wip");
          }}
        >
          <span className="task-header">
            {" "}
            <h4>Wip</h4>
          </span>
          {tasks.wip}
        </div>

        <div
          className="column"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "dones")}
        >
          <span className="task-header">
            {" "}
            <h4>Dones</h4>{" "}
          </span>
          {tasks.dones}
        </div>

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
                  Modal title
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
                      this.props.addTodos(
                        this.state.title,
                        this.state.boardKey,
                        this.state.currentUserId
                      );
                    }
                    this.setState({ title: "" });

                    console.log("girdi");
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
}

function mapStateToProps(state) {
  var todosList = _.map(state.todosList.todosList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  /* if(todosList){
        todosList = todosList;
    } */

  var InProgressList = _.map(
    state.InProgressList.InProgressList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );

  var donesList = _.map(state.donesList.donesList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    todosList,
    InProgressList,
    donesList,
  };
}

export default connect(mapStateToProps, {
  getTodos,
  getInProgress,
  getDones,
  addTodos,
  deleteTodos,
  todosToInProgress,
  InProgressToTodos,
  InProgressToDone,
  DoneToInProgress,
  TodosToDone,
  DoneToTodos,
  addTasks,
})(Trello);



