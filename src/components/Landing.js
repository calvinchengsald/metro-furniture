
import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import HistoryBar from './HistoryBar';

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      type: "none"
    };

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
              search = {this.props.commonVars.search}
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
              {this.props.commonVars.categoryKeys.map((key, index)=>{
                return <button key={index} type="button" className="btn btn-secondary col-2" onClick={()=>this.props.commonVars.setCategory(key)}>
                    <img src={`${this.props.commonVars.awsPath}/icon/!icon/${key}.png`} className="img-fluid-1 img-thumbnail" alt={key}/>
                    <div> {this.unlinkify(key)} </div>
                  </button>;
              })}

            </div>
          </div>
        </div>

        {this.props.commonVars.landingCategory!=="none"?
        <div>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="heading2"> Select the type of {this.props.commonVars.landingCategory}</div>
            </div>
          </div>

          <div id="type" className="row">
            <div className="offset-1 col-10">
              <div className="row justify-content-center" >
                {this.props.commonVars.category[this.props.commonVars.landingCategory].map((type, index)=>{

                  return <Link key={`landing-key-${index}`} className='bg-light col-3' to={`/inventory/${this.props.commonVars.landingCategory}/`+type}>
                      <div className="row">
                        <div className="col-12">
                          <img className="img-fluid-1" src={`${this.props.commonVars.awsPath}/icon/!icon/${type}.png`} alt={type}/>
                        </div>
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
