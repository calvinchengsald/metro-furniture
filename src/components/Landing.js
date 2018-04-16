
import React, { Component } from 'react';
import chairPic from '../image/chair.png';
import tablePic from '../image/table.png';
import basePic from '../image/base.png';
import boothPic from '../image/booth.png';
import cabinetPic from '../image/cabinet.png';
import otherPic from '../image/other.png';

class Landing extends Component {

  constructor(props){
    super(props);
    this.state = {
      category : "none",
      type: "none"
    };
    this.category = [];
    this.categoryKeys = ["chair", "table", "base", "booth" , "cabinet", "other"];
    var types = [];
    types.push("Wooden Chair");
    types.push("Metal Chair");
    types.push("Wooden Barstool");
    types.push("Metal Barstool");
    types.push("Outdoor Chair")
    this.category[this.categoryKeys[0]] = types;
    var types = [];
    types.push("Solid Wood");
    types.push("Resin");
    types.push("Veneer");
    types.push("Laminated");
    types.push("Metal Laminated")
    types.push("Fiber Glass")
    this.category[this.categoryKeys[1]] = types;
    var types = [];
    types.push("Cast Iron");
    types.push("Stainless Steel");
    this.category[this.categoryKeys[2]] = types;
    var types = [];
    types.push("Fast Food Table");
    types.push("Traditional Booth");
    this.category[this.categoryKeys[3]] = types;
    var types = [];
    types.push("Garbage Cabinet");
    types.push("Maitred D Stand");
    types.push("Waiter Station");
    types.push("Cashier Counter");
    this.category[this.categoryKeys[4]] = types;
    var types = [];
    types.push("Wallpaper");
    types.push("Japanese Tableware");
    types.push("LED Signs");
    types.push("A-Frame Board");
    types.push("Wooden Screen");
    types.push("Ash Barrel");
    types.push("Color Options");
    this.category[this.categoryKeys[5]] = types;

    this.categoryKeys.map((key,index)=>{
      this.category[key]
    })
  }

  setCategory(cat){
    this.setState({
      category: cat,
    });

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
            <div className="btn-group" role="group">
              {this.categoryKeys.map((key, index)=>{
                return <button type="button" className="btn btn-secondary" onClick={()=>this.setCategory(key)}>
                    <img src={chairPic} className="img-fluid img-thumbnail" alt="Chair"/>
                    <div> {key} </div>
                  </button>;
              })}

            </div>
          </div>
        </div>


        {this.state.category!=="none"?
        <div>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="heading1"> Select the type of {this.state.category}</div>
            </div>
          </div>

          <div id="type" className="row">
            <div className="offset-1 col-10">
              <div className="btn-group" role="group">
                {this.category[this.state.category].map((type, index)=>{
                  return <button type="button" className="btn btn-secondary" >
                      <img src={chairPic} className="img-fluid img-thumbnail" alt="Chair"/>
                      <div> {type} </div>
                    </button>;
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
