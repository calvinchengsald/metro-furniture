
import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import HistoryBar from './HistoryBar';

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      type: "none"
    };

    this.awsPath = 'https://s3.amazonaws.com/metro-furniture-resources';
    //this.awsPath = '';
    //console.log("hi u should see one only once");

    let hash = this.props.location.hash.replace('#!','');
    if(hash.length!==0){
      this.props.history.replace(hash);
    }
  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
  }




  render() {
    return (
      <div >
        <div className='row'>
          <div className='col-10 offset-1'>
            <HistoryBar
              category = "none"
              type = "none"
              item = "none"
              unlinkify = {(str)=>this.unlinkify(str)}
            />
          </div>
        </div>
        <div className="row">
          <div className="offset-2 col-8">
            <div className="heading1"> I am looking for... </div>
          </div>
        </div>
        <div className = "row" id="category">
          <div className="col-12 col-md-10 offset-md-1">
            <div className="btn-group row" role="group">
              {this.props.categoryKeys.map((key, index)=>{
                return <button key={index} type="button" className="btn btn-secondary col-2" onClick={()=>this.props.setCategory(key)}>
                    <img src={`${this.awsPath}/image/icon/${key}.png`} className="img-fluid img-thumbnail" alt="Chair"/>
                    <div> {this.unlinkify(key)} </div>
                  </button>;
              })}

            </div>
          </div>
        </div>

        {this.props.landingCategory!=="none"?
        <div>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="heading2"> Select the type of {this.props.landingCategory}</div>
            </div>
          </div>

          <div id="type" className="row">
            <div className="offset-1 col-10">
              <div className="btn-group row justify-content-center" role="group">
                {this.props.category[this.props.landingCategory].map((type, index)=>{


                  return <Link className='bg-light col-3' to={`/inventory/${this.props.landingCategory}/`+type}>
                      <img className="img-fluid" src={`${this.awsPath}/image/icon/${type}.png`} alt={type}/>
                      <div className='row'>
                        <div className="col-12 text-muted text-center text-md">{this.unlinkify(type)}</div>
                      </div>
                  </Link>
                })}

              </div>
            </div>
          </div>
        </div>
        :
        <div></div>
        }

      </div>

    );
  }
}

export default Landing;
