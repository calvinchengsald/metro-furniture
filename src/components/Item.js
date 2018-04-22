
import React, { Component } from 'react';
import directoryData from '../data/directory';

class Item extends Component {

  constructor(props){
    super(props);
    this.initialize(false);
  }
  initialize(set){
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.content = [];
    this.mainPic = 0;
    this.notFound = false;

    this.menuCat = directoryData.find((cat)=>{
      return cat.name === this.category;
    });

    if(this.menuCat !== undefined && this.menuCat.dirs !== undefined){
      this.menuType = this.menuCat.dirs.find((type)=>{
        return type.name === this.type;
      });
    }
    else {
      this.notFound = true;
    }

    if(this.menuType !== undefined && this.menuType.dirs !== undefined){
      this.itemType = this.menuType.dirs.find((item)=>{
        return item.name === this.item;
      });
    }
    else {
      this.notFound = true;
    }

    if(this.itemType !== undefined && this.itemType.dirs !== undefined){
      this.itemType.dirs.map((item,index)=>{
        this.content.push({
          image: `/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
          name: this.unPicturify(item.name)
        });
        this.notFound = false;
        return item;
      });
    }
    else {
      this.notFound = true;
    }
    if(set){
      this.setState({

      });
    }
  }

  handleKeyPress(e){
    console.log("presed");
    if(e.keyCode === 38){
      this.scrollPic(1);
    }
    else if(e.keyCode === 40){
      this.scrollPic(0);
    }
  }
  scrollPic(dir){
    if(dir===0){
      this.mainPic = (this.mainPic+this.content.length-1) % this.content.length;
        console.log("down");
    }
    else {
      this.mainPic = (this.mainPic+this.content.length+1) % this.content.length;

        console.log("up");
    }
    this.setState({

    });
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
    else
    return (
      <div id="item" >
        <div className='row justify-content-center'>
            <div className='heading1 text-center'>
              {this.unlinkify(this.props.match.params.item)}
            </div>
          </div>

          <div className='row justify-content-center'>
            <div className =' col-11'>
              <div className='row'>
                <div className="col-xs-12 col-md-3">
                  <div className="list-group" id="list-tab" role="tablist">
                    {this.content.map((content, index)=>{

                      return <a onKeyUp={(e)=>this.handleKeyPress(e)} key={`${index}`} className={index===0?`list-group-item list-group-item-action active`:`list-group-item list-group-item-action`} id={`list-${content.name}-list`} data-toggle="list" href={`#list-${content.name}`} role="tab" aria-controls={`${content.name}`} >
                          <div>
                          {content.name}
                          </div>
                        </a>
                    })}

                  </div>
                </div>
                <div className="col-xs-12 col-md-9">
                  <div className="tab-content" id="nav-tabContent">
                    {this.content.map((content, index)=>{

                      return <div key={`${index}`} className={index===0?`tab-pane fade show active`:`tab-pane fade show`} id={`list-${content.name}`} role="tabpanel" aria-labelledby={`list-${content.name}-list`}>
                        <img className="img-fluid " src={`${content.image}`} alt={content.name}/>
                      </div>
                    })}

                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>

    );
  }
}

export default Item;
