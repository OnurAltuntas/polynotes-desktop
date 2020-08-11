import React, { Component } from "react";
import { connect } from "react-redux";
import {getBoards} from '../redux/actions/index';
import _ from 'lodash';
import firebaseConfig from '../../src/components/config/FbConfig';
import firebase from 'firebase';




class Boards extends Component {
  componentDidMount() {
    var temp = "gelir inş";
    var user = firebase.auth().currentUser;
    console.log(this.props.location.state.id);
    this.props.getBoards(this.props.location.state.id);
  }

  
  state = {
    empty: '',
    Visible: false,
    modalVisible:false,
    itemKey: '',
    title:'',

    addState: {
      empty: '',
      modalVisible: false,
    },
  };


  drawHandler = () => {};

  render() {
    console.log(this.props.location.state);
    if (this.props.boardsList) {
       var temp = Object.values(this.props.boardsList)
       console.log(temp);
       return(
           <div>
           <h1>Boards Page</h1>
           {temp.map((item) => (
            <div>
                <h3>{item.title}</h3>
            </div>
            ))}
           </div>
       )
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
/*   const boardsList = _.map(state.boardsList.boardsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  }); */

  return {
    boardsList:state.boardsList.boardsList
  };
}
export default connect(mapStateToProps, { getBoards })(Boards);
