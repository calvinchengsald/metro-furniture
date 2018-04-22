
import React, { Component } from 'react';
import {Link}  from 'react-router-dom';

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      type: "none"
    };

    //console.log("hi u should see one only once");

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
        <div className="row">
          <div className="offset-2 col-8">
            <div className="heading1"> I am looking for... </div>
          </div>
        </div>
        <div className = "row" id="category">
          <div className="offset-1 col-10">
            <div className="btn-group row" role="group">
              {this.props.categoryKeys.map((key, index)=>{
                return <button key={index} type="button" className="btn btn-secondary col-2" onClick={()=>this.props.setCategory(key)}>
                    <img src={'/image/icon/'+key+'.png'} className="img-fluid img-thumbnail" alt="Chair"/>
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
                  return <div key={index} className="card bg-light col-3">
                    <Link to={`/inventory/${this.props.landingCategory}/`+type}>

                    <img className="card-img-top " src={`/image/icon/${type}.png`} alt={type}/>
                    <div className="card-body text-left ">
                      <div className="text-muted text-center">{this.unlinkify(type)}</div>
                    </div>
                    </Link>
                  </div>;
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
