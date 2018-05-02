
import React, { Component } from 'react';
import directoryData from '../data/directory';
import {Link}  from 'react-router-dom';
import HistoryBar from './HistoryBar';

class Type extends Component {

  constructor(props){
    super(props);
    this.initialize(false);

    this.searchParams = new URLSearchParams(this.props.location.search);
    this.searchCode = this.searchParams.get("itemCode");
    this.props.commonVars.setSearchCurrent(this.searchCode);
    this.allItems = [];

    directoryData.map((cat)=>{
      if(this.props.commonVars.categoryKeys.includes(cat.name)){
        cat.dirs.map((type)=>{
          type.dirs.map((itemGroup)=>{
              itemGroup.dirs.map((item)=>{
                item.category = cat.name;
                item.type = type.name;
                item.itemGroup = itemGroup.name;
                this.allItems.push(item);
                return item;
              })
              return itemGroup;
          })
          return type;
        })
      }
      return cat;
    });
    this.filteredContent = [];
    this.filterContent(this.searchCode);


  }
  filterContent(targetCode){
    this.filteredContent=[];
    this.allItems.map((item)=>{
      if(this.unPicturify(item.name).toLowerCase().includes(targetCode.toLowerCase())){
        this.filteredContent.push({
          name: this.unPicturify(item.name),
          image: `${this.props.commonVars.awsPath}/image/${item.category}/${item.type}/${item.itemGroup}/${item.name}`,
          href: `/${item.category}/${item.type}/${item.itemGroup}#${this.unPicturify(item.name)}`,

        });
      }
      return item;
    })

  }

  initialize(set){

  }
  find(arr, target){
    for(var i = 0; i < arr.length; i++){
      if(arr[i].name === target){
        return arr[i];
      }
    }
    return arr[-1];
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
      return (
        <div id="type">
          <div className='row'>
            <div className='col-10 offset-1'>
              <HistoryBar
                type = "none"
                item = "none"
                search = {this.props.commonVars.search}
              />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-12 heading1 text-center'>
              {this.searchCode}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-10 offset-md-1'>
              {this.filteredContent.length !==0?
                <div className='row'>
                  {this.filteredContent.map((items, index)=>{

                    return <Link key={`link2-${index}`} className='border bg-light col-3' to={`/inventory${items.href}`}>
                        <img className="card-img-top " src={`${items.image}`} alt={items.name}/>

                        <div className='row justify-content-center'>
                          <div className="text-muted text-center">{this.unlinkify(items.name)}</div>
                        </div>
                      </Link>
                  })}
                </div>
                :
                <div>
                  No Results....Please try another item code
                </div>
              }
            </div>
          </div>
        </div>
      )
  }

}

export default Type;
