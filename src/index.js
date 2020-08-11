import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/root/App';
import Profile from './Profile';
import Boards from './components/Boards';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import fbConfig from "../src/components/config/FbConfig";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware ,compose } from "redux"
import reduxThunk from "redux-thunk";
import rootReducer from "./redux/reducers/index"
 
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
 
ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <Provider store={store}>
        <div className="App">
          <Route path="/" exact component={App} />
          <Route path="/Profile" exact component={Profile} />
          <Route path="/Boards" exact component={Boards} />
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/SignUp" exact component={SignUp} />
        </div>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();