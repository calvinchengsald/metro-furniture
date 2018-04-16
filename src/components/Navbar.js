
import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

  constructor(props){
    super(props);

  }



  render() {
    return (
      <div id="sidebar">
          {this.props.navCollapse?
          <div>
            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn" onClick={this.props.collapseSidebar}>
               Toggle Sidebar
            </button>
          </div>
          :
          <div className = "col-2" >
            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn" onClick={this.props.collapseSidebar}>
               Toggle Sidebar
            </button>
            <div className = "sidebar">
              <ul>
                 <li className="active" ><a href="/">Home</a></li>
                 <li><a href="/">Chair</a></li>
                 <li><a href="/">Table</a></li>
                 <li><a href="/">Base</a></li>
                 <li><a href="/">Booth</a></li>
              </ul>
            </div>
          </div>
          }
      </div>

    );
  }
}

export default Navbar;
