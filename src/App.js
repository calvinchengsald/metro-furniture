import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import Item from './components/Item.js';
import Type from './components/Type.js';


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
            <div className="col">
              <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn" onClick={()=>this.collapseSidebar()}>
                 Toggle Sidebar
              </button>
            </div>
          </div>
          <div className="row">
            <Navbar
              navCollapse = {this.state.navCollapse}
            />
            <div className = {this.state.navCollapse?"col-12 content":"col-10 content"} >
              <Route exact path = "/" component = {Landing}/>
              <Route exact path = "/inventory/:category/:type" component = {Type}/>
              <Route exact path = "/inventory/:category/:type/:item" component = {Item}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
