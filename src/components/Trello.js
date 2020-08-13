import React, { Component } from 'react';
import {getTodos} from "../redux/actions/index";
import {getInProgress} from "../redux/actions/index";
import firebase from "firebase";
import _ from "lodash";
import { connect } from "react-redux";

 class Trello extends Component {

    state={
        tasks: [
            {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"}
          ],
          status:true
      }


    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.getTodos(this.props.location.state.id,user.uid);
                this.props.getInProgress(this.props.location.state.id,user.uid);

            }
          });
         
    }

    handlePush = () =>{
        if(this.props.todosList){
            for(let i = 0 ; i < Object.values(this.props.todosList).length ; i++){
                this.state.tasks.push({name:this.props.todosList[i].empty,category:"complete", bgcolor: "yellow"},);
            }
        }



       /*    if(this.props.InProgressList){
            var counter = 0;
            var inprogressLength =  Object.values(this.props.InProgressList).length;
            for (let el of Object.values(this.props.InProgressList)) {
                this.state.tasks.push({name:el.empty,category:"wip", bgcolor: "pink"},);
             
            };
        } */

        return(
            <h1></h1>
        )
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
        
        if(this.state.status){
            if(this.props.todosList){
                for(let i = 0 ; i < Object.values(this.props.todosList).length ; i++){
                    this.state.tasks.push({name:this.props.todosList[i].empty,category:"complete", bgcolor: "yellow"},);
                }
            }
            this.setState({status:false})
        }
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
    

    render() {

        var tasks = {
            wip: [],
            complete: []
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
            else if (t.category==='complete'){
                tasks.complete.push(
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
           
            <h2 className="header">DRAG & DROP DEMO</h2>
            <div className="wip"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "wip")}}>
                <span className="task-header">WIP</span>
                {tasks.wip}
            </div>
            <div className="droppable" 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "complete")}>
                 <span className="task-header">COMPLETED</span>
                 {tasks.complete}
            </div>


        </div>
        )
    }
}


function mapStateToProps(state) {
    const todosList = _.map(state.todosList.todosList, (val, key) => {
      return {
        ...val,
        key: key,
      };
    });

    const InProgressList = _.map(state.InProgressList.InProgressList, (val, key) => {
        return {
          ...val,
          key: key,
        };
      });
  
    return {
      todosList,
      InProgressList,
    };
  }

export default connect(mapStateToProps, { getTodos, getInProgress })(Trello);

