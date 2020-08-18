import React, { Component } from 'react';
import {getTodos} from "../redux/actions/index";
import {getInProgress} from "../redux/actions/index";
import {getDones} from "../redux/actions/index";
import {addTodos} from "../redux/actions/index";
import {deleteTodos} from "../redux/actions/index";
import firebase from "firebase";
import _ from "lodash";
import { connect } from "react-redux";
import "./root/App.css";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import Fab from "@material-ui/core/Fab";



 class Trello extends Component {

      constructor(props){
        super(props);
        this.state = {
            tasks: [
                {name:"Learn Angular",key:"1",category:"wip", bgcolor: "yellow"},
                {name:"React", key:"2" ,category:"wip", bgcolor:"pink"},
                {name:"Vue", key:"3", category:"todos", bgcolor:"skyblue"},
                {name:"Asp", key:"4",category:"dones", bgcolor:"red"}
              ],
              todosStatus:true,
              wipStatus:true,
              donesStatus:true,
    
              empty: "",
              Visible: false,
              modalVisible: false,
              itemKey: "",
              title: "",
              boardKey:"",
              currentUserId:"",
          
              addState: {
                empty: "",
                modalVisible: false,
              },
        };
      }


    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                this.props.getTodos(this.props.location.state.id,user.uid);
                this.props.getInProgress(this.props.location.state.id,user.uid);
                this.props.getDones(this.props.location.state.id,user.uid);
                this.setState({currentUserId:user.uid});
                this.setState({boardKey:this.props.location.state.id});
                
            }
          });

         
         
    }

  /*   componentWillUpdate(){
        console.log(this.props.todosList);
        this.loadWithStart();
    } */

   

    loadWithStart = () =>{
        console.log('loadWithStart');
        if(this.state.todosStatus){
            if(this.props.todosList){
                for(let i = 0 ; i < Object.values(this.props.todosList).length ; i++){
                    this.state.tasks.push({name:this.props.todosList[i].empty,key:this.props.todosList[i].key,category:"todos", bgcolor: "yellow"},);
                }
                this.setState({todosStatus:false})
            }
          
        }
        if(this.state.wipStatus){
            if(this.props.InProgressList){
                var counter = 0;
                var inprogressLength =  Object.values(this.props.InProgressList).length;
                for (let el of Object.values(this.props.InProgressList)) {
                    this.state.tasks.push({name:el.empty,key:el.key,category:"wip", bgcolor: "pink"},);
                
                };
                this.setState({wipStatus:false})
            }
           
        }

        if(this.state.donesStatus){
            if(this.props.donesList){
                var counter = 0;
                var donesLength =  Object.values(this.props.donesList).length;
                for (let el of Object.values(this.props.donesList)) {
                    this.state.tasks.push({name:el.empty,key:el.key,category:"dones", bgcolor: "red"},);
                
                };
            }
            this.setState({donesStatus:false})
        }
        
    }

    
        handleOnChange = (e) => {
            this.setState({
            title: e.target.value
            });

            console.log('$$$$$$$$$'+this.state.title);
        };

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
        this.loadWithStart();
            
    }
  
    onDragOver = (ev) => {
        ev.preventDefault();
    }
  
    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });
  
       this.setState({
           ...this.state,
           tasks
       });
    }

    handleDeleteTodos = (taskKey)=>{
        this.props.deleteTodos(this.state.boardKey,taskKey,this.state.currentUserId);
         
       let tasks = this.state.tasks.filter((task) => {
       return task.key !== taskKey 
        });

        this.setState({
        ...this.state,
        tasks
      });
    }

    handleAddTodos = () => {

    }
    

    render() {

        var tasks = {
            wip: [],
            todos: [],
            dones: []
        }


        this.state.tasks.forEach ((t) => {
            if(t.category==='wip'){
                tasks.wip.push(
                    <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                  
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
                )
            }
            else if (t.category==='todos'){
                tasks.todos.push(
                    <div className="card2" key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                  
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                <Fab color="secondary" aria-label="delete">
                <DeleteIcon
                onClick={() =>this.handleDeleteTodos(t.key)}
                />
              </Fab>
                    {t.name}
                </div>
                ) 
            }
            else if (t.category==='dones'){
                tasks.dones.push(
                    <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
                ) 
            }
            else{
                return(
                    <div></div>
                )
            }
        });

        return (
            
            <div className="container-drag">
           
            <h2 className="row">DRAG & DROP DEMO</h2>
           
            <div className="column" 
            
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "todos")}>
               
                 <span className="task-header">Todos
                 <Fab
                 style={{
                   backgroundColor: "#FFB500",
                   width: "45px",
                   height: "45px",
                   float:"right",
                    marginRight:10,
                 }}
                 aria-label="add"
                 data-toggle="modal"
                 data-target="#exampleModal"
               >
                 {" "}
                 <AddIcon />
               </Fab>
                 
               </span>
                
               {tasks.todos}

                
            </div>

            <div className="column"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, "wip")}}>
            <span className="task-header">WIP</span>
            {tasks.wip}
            </div>
            
            <div className="column" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "dones")}>
             <span className="task-header">Dones</span>
             {tasks.dones}
            </div>




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
        /* onClick={() => {
          this.props.editTodos(
            this.state.title,
            this.state.itemKey,
          );
          this.setState({title: ''});
          this.setState({Visible: false});
        }} */
        >Edit Board</button>
        <button type="button" class="btn btn-primary"
        onClick={()=>{ this.props.addTodos(
          this.state.title,this.state.boardKey,this.state.currentUserId
        );
          this.setState({title:''});
          this.setState({wipStatus:true});
          this.setState({todosStatus:true});
          this.setState({donesStatus:true});
          console.log('girdi');
          
      }}
        >Add Board</button>
      </div>
    </div>
  </div>
</div>
      
        </div>
        )
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

    var InProgressList = _.map(state.InProgressList.InProgressList, (val, key) => {
        return {
          ...val,
          key: key,
        };
      });

      var donesList = _.map(state.donesList.donesList, (val, key) => {
        return {
          ...val,
          key: key,
        };
      });
  
    return {
      todosList,
      InProgressList,
      donesList
    };
  }

export default connect(mapStateToProps, { getTodos, getInProgress,getDones,addTodos,deleteTodos })(Trello);

