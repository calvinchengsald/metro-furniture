
import React, { Component } from 'react';

class Inventory extends Component {

  constructor(props){
    super(props);

  }



  render() {
    return (
      <div id="inventory">
        {this.props.match.params.type}
      </div>

    );
  }
}

export default Inventory;
