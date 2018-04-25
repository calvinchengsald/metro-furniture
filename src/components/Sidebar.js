
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {

  constructor(props){
    super(props);

  }
  linkify(str){
    return str.replace(/ /g, '_');
  }
  unlinkify(str){
    return str.replace(/_/g, ' ');
  }



  render() {
    return (
      <div id="sidebar" >
          {this.props.navCollapse?
          <div>
          </div>
          :
          <div className = "sidebar">
            <div className='row'>
              <div className='col-11 offset-1'>
                <div className='heading1'> Directory </div>
                <div className='row'>
                  <Link className='sidebar-heading text-3' to='/'>Home </Link>
                </div>
                {this.props.categoryKeys.map((key,index)=>{
                  return <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                          <button className="sidebar-heading text-3 text-left" type="button" data-toggle="collapse" data-target={`#${key}-collapse`} aria-expanded="false" aria-controls="collapseExample">
                            {key}
                          </button>
                        </div>
                        <div id={`${key}-collapse`} className='sidebar-collapsible row collapse'>
                          {this.props.category[`${key}`].map((type, index)=>{
                            return <div className='col-12'>
                              <Link className='' to={`/inventory/${key}/${type}`}>
                                <div className='sidebar-item text-muted text-3 text-left'>{this.unlinkify(type)}</div>
                              </Link>
                            </div>

                          })}
                        </div>

                    </div>
                  </div>

                })}

              </div>

            </div>

          </div>
          }
      </div>

    );
  }
}

export default Sidebar;
