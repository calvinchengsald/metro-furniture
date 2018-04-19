
import React, { Component } from 'react';
import directoryData from '../data/directory';

class Type extends Component {

  constructor(props){
    super(props);
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.state={

    }

    this.menuCat = directoryData.find((cat)=>{
      return cat.name === this.category;
    });
    this.menuType = this.menuCat.dirs.find((type)=>{
      return type.name === this.type;
    });
    this.content = [];

    this.menuType.dirs.map((type, index)=>{
      try{
        this.content.push({
          name: type.name,
          image: `/image/${this.category}/${this.type}/${type.name}/${type.dirs[0].name}`,
          href: `/${this.category}/${this.type}/${type.name}`,
        });
      }
      catch (e) {

      }
      return type;
    });
    // console.log(directoryData);
    // console.log(this.menuCat);
    // console.log(this.menuType);
    // console.log(typeof(this.menuType));
    // console.log(this.content);

  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
  }


  render() {
    return (
      <div id="type">
        <div className='row justify-content-center'>
          <div className='heading1 text-center'>

            {this.unlinkify(this.props.match.params.type)}
          </div>
        </div>


        <div className='row'>
          {this.content.map((content, index)=>{

            return <div key={index} className="card bg-light col-3">
              <a href={`/inventory${content.href}`}>
              <img className="card-img-top " src={`${content.image}`} alt={content.name}/>

              <div className="card-body text-left ">
                <div className="text-muted text-center">{this.unlinkify(content.name)}</div>
              </div>
              </a>
            </div>
          })}
        </div>
      </div>

    );
  }
}

export default Type;
