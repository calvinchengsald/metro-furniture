
import React, { Component } from 'react';
import directoryData from '../data/directory';
import {Link}  from 'react-router-dom';
import HistoryBar from './HistoryBar';

class Type extends Component {

  constructor(props){
    super(props);
    this.initialize(false);

  }

  initialize(set){
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.notFound = false;
    this.content = [];
    this.allItems = [];

    //this.awsPath = '';
    this.menuCat= this.find(directoryData, this.category);

    if(this.menuCat !== undefined && this.menuCat.dirs !== undefined){

      this.menuType= this.find(this.menuCat.dirs, this.type);
    } else {
      this.notFound = true;
    }

    if(this.menuType !== undefined && this.menuType.dirs !== undefined){
      this.menuType.dirs.map((type, index)=>{
        try{
          this.content.push({
            name: type.name,
            image: `${this.props.commonVars.awsPath}/image/${this.category}/${this.type}/${type.name}/${type.dirs[0].name}`,
            href: `/${this.category}/${this.type}/${type.name}`,
            object: type
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


    if(!this.notFound){
      this.content.map((content, index)=>{
        content.object.dirs.map((item, index) =>{
          this.allItems.push({
            image: `${this.props.commonVars.awsPath}/image/${this.category}/${this.type}/${content.object.name}/${item.name}`,
            name: this.unPicturify(item.name),
            href: `/${this.category}/${this.type}/${content.object.name}#${this.unPicturify(item.name)}`,
          });
          return item;
        });
        return content;

      });
    }
  }
  find(arr, target){
    for(var i = 0; i < arr.length; i++){
      if(arr[i].name === target){
        return arr[i];
      }
    }
    return arr[-1];
  }
  checkRefresh(str){
    if(str !== this.type){
      this.initialize(true);
    }
    str=str.replace(/_/g, ' ');
    return "";
  }
  unPicturify(str){
    str = str.replace(/.png/g, '');
    return str.replace(/.jpg/g, '');
  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
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
          <div className='row'>
            <div className='col-10 offset-1'>
              <HistoryBar
                category = {this.category}
                type = {this.type}
                item = "none"
                unlinkify = {(str)=>this.unlinkify(str)}
                search = {this.props.commonVars.search}
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-3 offset-md-1'>
              <div className="btn-group" onClick={()=>this.props.commonVars.setTypeView()} role="group">
                <button type="button" className={this.props.commonVars.typeView===0?"text-md btn btn-dark":"text-md btn btn-light" }>Category</button>
                <button type="button" className={this.props.commonVars.typeView===1?"text-md btn btn-dark":"text-md btn btn-light" }>Individual</button>
              </div>
            </div>
            <div className='col-8 heading1 text-center'>
              {this.unlinkify(this.props.match.params.type)}
              {this.checkRefresh(this.props.match.params.type)}
            </div>

          </div>
          <div className='row'>
            <div className='col-12 col-md-10 offset-md-1'>


            {this.props.commonVars.typeView===0?
              <div className='row'>
              {this.content.map((content, index)=>{
                return <Link key={`link-${index}`} className='border bg-light col-3' to={`/inventory${content.href}`}>
                  <img className="card-img-top " src={`${content.image}`} alt={content.name}/>

                    <div className='row justify-content-center'>
                      <div className="text-muted text-center">{this.unlinkify(content.name)}</div>
                    </div>
                </Link>
              })}
              </div>
              :
              <div className='row'>
              {this.allItems.map((items, index)=>{

                return <Link key={`link2-${index}`} className='border bg-light col-3' to={`/inventory${items.href}`}>
                    <img className="card-img-top " src={`${items.image}`} alt={items.name}/>

                    <div className='row justify-content-center'>
                      <div className="text-muted text-center">{this.unlinkify(items.name)}</div>
                    </div>
                  </Link>
              })}
              </div>
            }

            </div>
          </div>
        </div>

      );
    }
  }
}

export default Type;
