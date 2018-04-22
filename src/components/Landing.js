
import React, { Component } from 'react';
import {Link}  from 'react-router-dom';

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      category : "none",
      type: "none"
    };
    this.category = [];
    this.categoryKeys = ["Chair", "Table", "Base", "Booth" , "Cabinet", "Other"];
    var types = [];
    types.push("Wooden_Chair");
    types.push("Metal_Chair");
    types.push("Wooden_Barstool");
    types.push("Metal_Barstool");
    types.push("Outdoor_Chair")
    this.category[this.categoryKeys[0]] = types;
    types = [];
    types.push("Solid_Wood");
    types.push("Resin");
    types.push("Veneer");
    types.push("Laminated");
    types.push("Metal_Laminated")
    types.push("Fiber_Glass")
    this.category[this.categoryKeys[1]] = types;
    types = [];
    types.push("Cast_Iron");
    types.push("Stainless_Steel");
    this.category[this.categoryKeys[2]] = types;
    types = [];
    types.push("Fast_Food_Table");
    types.push("Traditional_Booth");
    this.category[this.categoryKeys[3]] = types;
    types = [];
    types.push("Garbage_Cabinet");
    types.push("Maitred_D_Stand");
    types.push("Waiter_Station");
    types.push("Cashier_Counter");
    this.category[this.categoryKeys[4]] = types;
    types = [];
    types.push("Wallpaper");
    types.push("Japanese_Tableware");
    types.push("LED_Sign");
    types.push("Menu_A-Frame_Board");
    types.push("Wooden_Screen");
    types.push("Ash_Barrel");
    types.push("Color_Options");
    this.category[this.categoryKeys[5]] = types;
    //console.log("hi u should see one only once");

  }

  setCategory(cat){
    this.setState({
      category: cat,
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
      <div >
        <div className="row">
          <div className="offset-2 col-8">
            <div className="heading1"> I am looking for... </div>
          </div>
        </div>
        <div className = "row" id="category">
          <div className="offset-1 col-10">
            <div className="btn-group row" role="group">
              {this.categoryKeys.map((key, index)=>{
                return <button key={index} type="button" className="btn btn-secondary col-2" onClick={()=>this.setCategory(key)}>
                    <img src={'/image/icon/'+key+'.png'} className="img-fluid img-thumbnail" alt="Chair"/>
                    <div> {this.unlinkify(key)} </div>
                  </button>;
              })}

            </div>
          </div>
        </div>


        {this.state.category!=="none"?
        <div>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="heading2"> Select the type of {this.state.category}</div>
            </div>
          </div>

          <div id="type" className="row">
            <div className="offset-1 col-10">
              <div className="btn-group row justify-content-center" role="group">
                {this.category[this.state.category].map((type, index)=>{
                  return <div key={index} className="card bg-light col-3">
                    <Link to={`/inventory/${this.state.category}/`+type}>

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
