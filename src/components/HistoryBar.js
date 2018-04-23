
import React, { Component } from 'react';

import {Link}  from 'react-router-dom';

class HistoryBar extends Component {

  constructor(props){
    super(props);

  }



  render() {
    return (
      <div className="container-fluid">
        <div className='row bg-light'>
          <div className='col-2'>
            <Link to={`/`}><div className='btn btn-primary'>Home</div></Link>
          </div>
          {this.props.type!=="none"?
          <div className='col-1'>
            <div>
              &#8658;
            </div>
          </div>
          :
          <div></div>
          }

          {this.props.type!=="none"?
          <div className='col-3'>
            <Link to={`/inventory/${this.props.category}/${this.props.type}`}>
              <div className='btn btn-primary'>{this.props.unlinkify(this.props.type)}</div>
            </Link>
          </div>
          :
          <div></div>
          }
          {this.props.item!=="none"?
          <div className='col-1'>
            <div>
              &#8658;
            </div>
          </div>
          :
          <div></div>
          }
          {this.props.item!=="none"?
          <div className='col-2'>
              <div className='btn btn-secondary'>{this.props.unlinkify(this.props.item)}</div>
          </div>
          :
          <div></div>
          }
        </div>

      </div>

    );
  }
}

export default HistoryBar;
