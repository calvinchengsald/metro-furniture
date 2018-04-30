import React, { Component } from 'react';
import {Link, Route}  from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import Item from './components/Item.js';
import Type from './components/Type.js';
import Contact from './components/Contact.js';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        navCollapse: true,
        landingCategory: "none",
    };
    this.awsPath = 'https://s3.amazonaws.com/metro-furniture-resources';
    //this.awsPath = '';
    this.category = [];
    this.categoryKeys = ["Chair", "Table", "Base", "Booth" , "Cabinet", "Other"];
    var types = [];
    types.push("Wooden_Chair");
    types.push("Metal_Chair");
    types.push("Wooden_Barstool");
    types.push("Metal_Barstool");
    types.push("Outdoor_Chair")
    this.category[this.categoryKeys[0]] = types;
    types = [];
    types.push("Solid_Wood");
    types.push("Resin");
    types.push("Veneer");
    types.push("Laminate");
    types.push("Metal_Laminate")
    types.push("Fiber_Glass")
    this.category[this.categoryKeys[1]] = types;
    types = [];
    types.push("Cast_Iron");
    types.push("Stainless_Steel");
    this.category[this.categoryKeys[2]] = types;
    types = [];
    types.push("Fast_Food_Table");
    types.push("Traditional_Booth");
    this.category[this.categoryKeys[3]] = types;
    types = [];
    types.push("Garbage_Cabinet");
    types.push("Maitred_D_Stand");
    types.push("Waiter_Station");
    types.push("Cashier_Counter");
    this.category[this.categoryKeys[4]] = types;
    types = [];
    types.push("Wallpaper");
    types.push("Japanese_Tableware");
    types.push("LED_Sign");
    types.push("Menu_A-Frame_Board");
    types.push("Wooden_Screen");
    types.push("Ash_Barrel");
    types.push("Color_Options");
    this.category[this.categoryKeys[5]] = types;
    //console.log("hi u should see one only once");
    this.customLanding = (props) => {
      return (
        <Landing
          category={this.category}
          categoryKeys={this.categoryKeys}
          landingCategory={this.state.landingCategory}
          setCategory={(key)=>this.setLandingCategory(key)}
          {...props}
        />
      );
    }
  }
  setLandingCategory(cat){
    this.setState({
      landingCategory: cat,
    });
    this.customLanding = (props) => {
      return (
        <Landing
          category={this.category}
          categoryKeys={this.categoryKeys}
          landingCategory={this.state.landingCategory}
          setCategory={(key)=>this.setLandingCategory(key)}
          {...props}
        />
      );
    }
  }


  collapseSidebar(){
    var tempCol = !this.state.navCollapse;
    this.setState({
      navCollapse: tempCol
    });
  }

  render() {

    return (
      <div className="App background">

        <main>
        </main>
        <Link to='/'>
        <div id="brand-bar" className='row justify-content-start'>
          <div className='col-12'>
            <img className='img-fluid' src={`${this.awsPath}/image/icon/logo-top.png`}/>
          </div>

        </div>
        </Link>
        <div className="main-holder  container-fluid">

          <div className='row d-none d-sm-block'>
            <Navbar
              category = {this.category}
              categoryKeys = {this.categoryKeys}
            />
          </div>

          <div className="row">
            <div className ="col-12 content" >
              <Route exact path = "/" render = {this.customLanding}/>
              <Route exact path = "/inventory/:category/:type" component = {Type}/>
              <Route exact path = "/inventory/:category/:type/:item" component = {Item}/>
              <Route exact path = "/Contact" component = {Contact}/>

            </div>
          </div>
        </div>

        <Sidebar
          category = {this.category}
          categoryKeys = {this.categoryKeys}
          navCollapse = {this.state.navCollapse}
        />
        <button type="button" id="sidebar-toggle" className="d-block d-sm-none btn btn-info navbar-btn" onClick={()=>this.collapseSidebar()}>
           &#920;
        </button>
      </div>
    );
  }
}

export default App;
