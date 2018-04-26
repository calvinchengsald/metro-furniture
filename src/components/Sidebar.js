
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
      <div id="sidebar" className={this.props.navCollapse?'':'active'} >

          <div className = "sidebar">
            <div className='row'>
              <div className='col-11 offset-1'>
                <div className='heading1'> Directory </div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='row'>
                      <Link className='border sidebar-heading text-6 text-left' to='/'>
                        <div className=''>Home</div>
                      </Link>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <Link className='border sidebar-heading text-6 text-left' to='/Contact'>
                        <div className=''>Contact</div>
                      </Link>
                    </div>
                  </div>
                </div>
                {this.props.categoryKeys.map((key,index)=>{
                  return <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                          <button className="border sidebar-heading text-6 text-left" type="button" data-toggle="collapse" data-target={`#${key}-collapse`} aria-expanded="false" aria-controls="collapseExample">
                            {key}
                          </button>
                        </div>
                        <div id={`${key}-collapse`} className='sidebar-collapsible border row collapse'>
                          {this.props.category[`${key}`].map((type, index)=>{
                            return <div className='col-12'>
                              <Link className='' to={`/inventory/${key}/${type}`}>
                                <div className='sidebar-item text-muted text-5 text-left'>{this.unlinkify(type)}</div>
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
      </div>

    );
  }
}

export default Sidebar;
