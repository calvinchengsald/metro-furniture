
import React, { Component } from 'react';
import commonVars from '../data/commonVar.js';
class Contact extends Component {

  constructor(props){
    super(props);

    this.awsPath = 'https://s3.amazonaws.com/metro-furniture-resources';
    //this.awsPath = '';
  }



  render() {

    return (
      <div id="contact">
        <div className='heading1'>
          Contact Us
        </div>
        <div className='row'>
          <div className='col-12 col-md-10 offset-md-2'>
            <div>
              Telephone: 718-366-6888
            </div>
            <div>
              Email: metrofurnitureny@gmail.com
            </div>
            <div>
              Address: 5105 Flushing Ave, Maspeth NY 11378
            </div>
            <div>
              Hours: 8:AM - 5:PM
               monday-saturaday
            </div>
          </div>
          <div className='col-12 col-md-10 offset-md-2'>
            <img src={`${this.awsPath}/image/icon/Direction.png`} />
          </div>
          <div className='col-12 col-md-10 offset-md-2'>
            <a className='text-muted' href="https://www.google.com/maps/place/Mayor+Restaurant+Furniture/@40.7134259,-73.9212232,15.42z/data=!4m5!3m4!1s0x0:0xf2cc81486bfc9e5!8m2!3d40.7137525!4d-73.9156187">
            Open in google maps
            </a>
          </div>
          <div className='col-12 col-md-10 offset-md-2'>
            <div>
              Due to constructions, please enter from the back
            </div>
          </div>

        </div>

      </div>

    );
  }
}

export default Contact;
