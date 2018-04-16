import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        navCollapse: false
    };
  }

  collapseSidebar(){
    var tempCol = !this.state.navCollapse;
    this.setState({
      navCollapse: tempCol
    });
    console.log("clicked");
  }

  render() {
    return (
      <div className="App background">

        <main>
        </main>
        <div className="main-holder container-fluid">
          <div className="row">
            <Navbar
              navCollapse = {this.state.navCollapse}
              collapseSidebar = {()=>this.collapseSidebar()}
            />
            <div className = {this.state.navCollapse?"col-12 content":"col-10 content"} >
              <Route exact path = "/" component = {Landing}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
