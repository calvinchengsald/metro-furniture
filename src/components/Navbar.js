
import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

  constructor(props){
    super(props);

  }



  render() {
    return (
      <div id="sidebar" className={this.props.navCollapse?"":"col-2"}>
          {this.props.navCollapse?
          <div>
          </div>
          :
          <div className = "sidebar">
            <ul>
               <li className="active" ><a href="/">Home</a></li>
               <li><a href="/">Chair</a></li>
               <li><a href="/">Table</a></li>
               <li><a href="/">Base</a></li>
               <li><a href="/">Booth</a></li>
            </ul>
          </div>
          }
      </div>

    );
  }
}

export default Navbar;
