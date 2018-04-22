
import React, { Component } from 'react';
import directoryData from '../data/directory';
import {Link}  from 'react-router-dom';

class Type extends Component {

  constructor(props){
    super(props);
    this.state={

    };
    this.initialize(false);

  }

  initialize(set){
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.notFound = false;
    this.content = [];

    this.menuCat = directoryData.find((cat)=>{
      return cat.name === this.category;
    });

    if(this.menuCat !== undefined && this.menuCat.dirs !== undefined){
      this.menuType = this.menuCat.dirs.find((type)=>{
        return type.name === this.type;
      });
    } else {
      this.notFound = true;
    }

    if(this.menuType !== undefined && this.menuType.dirs !== undefined){
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
    } else {
      this.notFound = true;
    }
    if(set){
      this.setState({

      });
    }
  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
  }
  checkRefresh(str){
    if(str !== this.type){
      this.initialize(true);
    }
    str=str.replace(/_/g, ' ');
    return "";
  }


  render() {
    if(this.notFound){
      return(
        <div className='row justify-content-center'>
          <div className=' col-12 heading1 text-center'>
            This page was not found
            {this.checkRefresh(this.props.match.params.type)}
          </div>
        </div>
      );
    }
    else {
      return (
        <div id="type">
          <div className='row justify-content-center'>
            <div className='heading1 text-center'>

              {this.unlinkify(this.props.match.params.type)}
              {this.checkRefresh(this.props.match.params.type)}
            </div>
          </div>


          <div className='row'>
            {this.content.map((content, index)=>{

              return <div key={index} className="card bg-light col-3">
                <Link to={`/inventory${content.href}`}>
                <img className="card-img-top " src={`${content.image}`} alt={content.name}/>

                <div className="card-body text-left ">
                  <div className="text-muted text-center">{this.unlinkify(content.name)}</div>
                </div>
                </Link>
              </div>
            })}
          </div>
        </div>

      );
    }
  }
}

export default Type;
