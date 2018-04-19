
import React, { Component } from 'react';
import directoryData from '../data/directory';

class Item extends Component {

  constructor(props){
    super(props);
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.state={

    }

    this.menuCat = directoryData.find((cat)=>{
      return cat.name === this.category;
    });
    this.menuType = this.menuCat.dirs.find((type)=>{
      return type.name === this.type;
    });
    this.itemType = this.menuType.dirs.find((item)=>{
      return item.name === this.item;
    });
    this.content = [];
    this.itemType.dirs.map((item,index)=>{
      this.content.push({
        image: `/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
        name: this.unPicturify(item.name)
      });
      return item;
    });
    this.mainPic = 0;

    console.log(this.content);

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


  render() {
    return (
      <div id="item">
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

                    return <a className={index===0?`list-group-item list-group-item-action active`:`list-group-item list-group-item-action`} id={`list-${content.name}-list`} data-toggle="list" href={`#list-${content.name}`} role="tab" aria-controls={`${content.name}`}>
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

                    return <div className={index===0?`tab-pane fade show active`:`tab-pane fade show`} id={`list-${content.name}`} role="tabpanel" aria-labelledby={`list-${content.name}-list`}>
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
