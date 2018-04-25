
import React, { Component } from 'react';
import directoryData from '../data/directory';
import {Link}  from 'react-router-dom';
import HistoryBar from './HistoryBar';

class Type extends Component {

  constructor(props){
    super(props);
    this.state={
      showType: 1
    };
    this.initialize(false);

  }

  initialize(set){
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.notFound = false;
    this.content = [];
    this.allItems = [];

    this.awsPath = 'https://s3.amazonaws.com/metro-furniture-resources';
    //this.awsPath = '';
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
            image: `${this.awsPath}/image/${this.category}/${this.type}/${type.name}/${type.dirs[0].name}`,
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
            image: `${this.awsPath}/image/${this.category}/${this.type}/${content.object.name}/${item.name}`,
            name: this.unPicturify(item.name),
            href: `/${this.category}/${this.type}/${content.object.name}#${this.unPicturify(item.name)}`,
          });
          return item;
        });
        return content;

      });
    }
  }

  unlinkify(str){
    return str.replace(/_/g, ' ');
  }
  linkify(str){
    return str.replace(/ /g, '_');
  }
  unPicturify(str){
    str = str.replace(/.png/g, '');
    return str.replace(/.jpg/g, '');
  }
  checkRefresh(str){
    if(str !== this.type){
      this.initialize(true);
    }
    str=str.replace(/_/g, ' ');
    return "";
  }
  toggleType(){
    if(this.state.showType===1){
      this.showType=0;
    }
    else this.showType = 1;
    this.setState({
      showType : this.showType,
    });
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
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-3'>
              <div className="btn-group" onClick={()=>this.toggleType()} role="group">
                <button type="button" className={this.state.showType===0?"text-md btn btn-dark":"text-md btn btn-light" }>Category</button>
                <button type="button" className={this.state.showType===1?"text-md btn btn-dark":"text-md btn btn-light" }>Individual</button>
              </div>
            </div>
            <div className='col-6 heading1 text-center'>
              {this.unlinkify(this.props.match.params.type)}
              {this.checkRefresh(this.props.match.params.type)}
            </div>

          </div>
          <div className='row'>
            <div className='col-12 col-md-10 offset-md-1'>


            {this.state.showType===0?
              <div className='row'>
              {this.content.map((content, index)=>{
                return <Link className='border bg-light col-3' to={`/inventory${content.href}`}>
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

                return <Link className='border bg-light col-3' to={`/inventory${items.href}`}>
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
