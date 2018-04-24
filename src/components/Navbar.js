
import React, { Component } from 'react';
import {Link}  from 'react-router-dom';

class Navbar extends Component {

  constructor(props){
    super(props);
    var arr = [];
    for(var i =0; i < 6; i++){
      arr[i] = false;
    }
    this.state={
      isOpen : arr,
    };


  }

  handleDropdown(index, bool){
    var arr = this.state.isOpen;
    arr[index] = bool;
    this.setState({
      isOpen: arr,
    });
  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
  }



  render() {
    return (
      <div id="navbar" className={this.props.navbarCollapse?"":"col-12"}>
          {this.props.navCollapse?
          <div>
          </div>
          :
          <div className = "row">
            <div className="container-fluid">
              <div className = "row">
                <div className = "col-10 offset-1">
                  <div className = "navbar-2 row">
                    {this.props.categoryKeys.map((cat, index)=>{
                      return   <div key={`${index}`} className="dropdown col-2 btn bg-light text-md" onMouseEnter ={()=>this.handleDropdown(`${index}`,true)} onMouseLeave ={()=>this.handleDropdown(`${index}`,false)}>
                        <div >{`${cat}`} &#8681; </div>
                        <ul className={this.state.isOpen[`${index}`]?`dropdown-menu show `:`dropdown-menu`}>
                          {this.props.category[`${cat}`].map((type, index)=>{
                            return <Link key={`${index}-link`} className='dropdown-item text-md' to={`/inventory/${cat}/${type}`}> <li >{this.unlinkify(`${type}`)}</li></Link>

                          })}
                        </ul>
                      </div>
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
          }
      </div>

    );
  }
}

export default Navbar;
