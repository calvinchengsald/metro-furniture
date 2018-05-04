import React, { Component } from 'react';
import {Link, Route}  from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Navbar from './components/Navbar.js';
import Search from './components/Search.js';
import Landing from './components/Landing.js';
import Item from './components/Item.js';
import Type from './components/Type.js';
import Contact from './components/Contact.js';
import directoryData from './data/directory';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        navCollapse: true,
        landingCategory: "none",
        typeView: 0,
        searchCurrent: "",
    };
    //this.awsPath = 'https://s3.amazonaws.com/metro-furniture-resources';
    this.awsPath = '';
    this.categoryKeys = [];
    this.category = [];
    var types = [];
    this.categoryKeys = ["Chair", "Table", "Base", "Booth" , "Cabinet", "Other"];

    for(var i = 0; i < directoryData.length; i++){
      if(directoryData[i].name[0]!=="!"){
        types = [];
        for(var j = 0; j < directoryData[i].dirs.length; j++){
          types.push(directoryData[i].dirs[j].name);
        }
        this.category[directoryData[i].name] =types;
      }
    }

    this.commonVars = new Object();
    this.commonVars.category = this.category;
    this.commonVars.categoryKeys = this.categoryKeys;
    this.commonVars.setCategory = (key) => {this.setLandingCategory(key)};
    this.commonVars.setTypeView = () => {this.setTypeView()};
    this.commonVars.setSearchCurrent = (str) => {this.setSearchCurrent(str)};
    this.commonVars.unlinkify = (str) => {this.unlinkify(str)};
    this.commonVars.linkify = (str) => {this.linkify(str)};
    this.commonVars.awsPath = this.awsPath;
    this.commonVars.landingCategory = this.state.landingCategory;
    this.commonVars.search = this.state.searchCurrent;
    this.commonVars.typeView = 0;
    this.customLanding = (props) => {
      return (
        <Landing
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    this.customType = (props) => {
      return (
        <Type
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    this.customItem = (props) => {
      return (
        <Item
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    this.customContact = (props) => {
      return (
        <Contact
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    this.customSearch = (props) => {
      return (
        <Search
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    //console.log("hi u should see one only once");

  }
  setLandingCategory(cat){
    this.setState({
      landingCategory: cat,
    });
    this.commonVars.landingCategory = cat;
  }
  setTypeView(){
    let typeView = 0;
    if(this.state.typeView ===0){
      typeView=1;
    }
    this.setState({
      typeView: typeView,
    })
    this.commonVars.typeView = typeView;
  }
  setSearchCurrent(str){
    this.setState({
      searchCurrent : str,
    });
    this.commonVars.search = str;
  }
  componentWillUpdate(){
    this.customLanding = (props) => {
      return (
        <Landing
          commonVars = {this.commonVars}
          {...props}
        />
      );
    }
    this.customType = (props) => {
      return (
        <Type
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
    this.customItem = (props) => {
      return (
        <Item
          commonVars = {this.commonVars}
          {...props}
        />
      );
    };
  }
  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
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
        <div className='row bg-dark '>
          <div className='text-light text-center col-10 offset-1'>This site is still under construction, we will be rolling out periodic updates</div>
        </div>
        <Link to='/'>
        <div id="brand-bar" className='row justify-content-start'>
          <div className='col-12'>
            <img className='img-fluid' src={`${this.awsPath}/image/!icon/logo-top.png`} alt={`logo`}/>
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
              <Route exact path = "/inventory/:category/:type" render = {this.customType}/>
              <Route exact path = "/inventory/:category/:type/:item" render = {this.customItem}/>
              <Route exact path = "/Contact" render = {this.customContact}/>
              <Route exact path = "/Search" render = {this.customSearch}/>

            </div>
          </div>
        </div>

        <Sidebar
          category = {this.category}
          categoryKeys = {this.categoryKeys}
          navCollapse = {this.state.navCollapse}
        />
        {this.state.navCollapse?
          <button type="button" id="sidebar-toggle" className="d-block d-sm-none btn btn-info navbar-btn" onClick={()=>this.collapseSidebar()}>
             &#920;
          </button>
          :
          <div className='sidebar-black' onClick={()=>this.collapseSidebar()}></div>
        }
      </div>
    );
  }
}

export default App;
