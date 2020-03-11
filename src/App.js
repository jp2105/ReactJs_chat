import React from 'react';
import logo from './logo.svg';
import './App.css';
import DesignDemo from './Component/DesignDemo';
import TempreatureCalculator from './Component/TempreatureCalculator';
import Login from './Component/login';
import Signup from './Component/Signup';
import Test from './Component/Test';
import Home from './Component/Home';
import FetchData from './Component/fetchData';
import Phone from './Component/phone';
import firebase from 'firebase';
import store from '../src/Store'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default class App extends React.Component {

  render () {

// Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDDiMCfI1wk_atH6_GOzdqh7Geehjoas2k",
      authDomain: "react-chat-e7bdb.firebaseapp.com",
      databaseURL: "https://react-chat-e7bdb.firebaseio.com",
      projectId: "react-chat-e7bdb",
      storageBucket: "react-chat-e7bdb.appspot.com",
      messagingSenderId: "699646899003",
      appId: "1:699646899003:web:230c344f8850f8f28afd1e",
      measurementId: "G-CTTQM90CJ8"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    return (
      <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={DesignDemo}>
            </Route>
            <Route path="/TempreatureCalculator" component={TempreatureCalculator}>
            </Route>
            <Route path="/Login" component={Login}>
            </Route>
            <Route path="/Signup" component={Signup}>
            </Route>
            <Route path="/Login/Test" component={Test}>
            </Route>
            <Route path="/FetchData" component={FetchData}>
            </Route>
            <Route path="/Home" component={Home}>
            </Route>
            <Route path="/Phone" component={Phone}>
            </Route>
          </Switch>
      </Router>
      </Provider>
    )
  }
}
