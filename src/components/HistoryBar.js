
import React, { Component } from 'react';

import {Link}  from 'react-router-dom';

class HistoryBar extends Component {

  constructor(props){
    super(props);

  }



  render() {
    return (
        <div id="historybar" className='row bg-light d-flex'>
            <Link className='btn btn-info text-md' to={`/`}>
              Home
            </Link>
          {this.props.type!=="none"?
            <div>
              &#8658;
            </div>
          :
          <div></div>
          }

          {this.props.type!=="none"?
            <Link to={`/inventory/${this.props.category}/${this.props.type}`}>
              <div className='btn btn-info text-md'>{this.props.unlinkify(this.props.type)}</div>
            </Link>
          :
          <div></div>
          }
          {this.props.item!=="none"?
            <div>
              &#8658;
            </div>
          :
          <div></div>
          }
          {this.props.item!=="none"?
            <div className='btn btn-secondary text-md'>{this.props.unlinkify(this.props.item)}</div>

          :
          <div></div>
          }
          <div className='ml-auto'>
            <form action="/search">
              <input name='itemCode' type="text" placeholder='item code or tag' defaultValue={this.props.search}/>
              <input type="submit" value="Search"/>
            </form>
          </div>

        </div>


    );
  }
}

export default HistoryBar;
