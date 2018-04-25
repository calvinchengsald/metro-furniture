
import React, { Component } from 'react';
import directoryData from '../data/directory';
import HistoryBar from './HistoryBar';

class Item extends Component {

  constructor(props){
    super(props);
    this.firstRef= React.createRef();
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.content = [];
    this.notFound = false;
    this.mainPic = 0;
    this.awsPath = 'https://s3.us-east-2.amazonaws.com/metro-furniture';
    //this.awsPath = '';
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
    let hash = this.props.location.hash.replace('#', '');
    if(this.itemType !== undefined && this.itemType.dirs !== undefined){
      this.itemType.dirs.map((item,index)=>{
        this.content.push({
          image: `${this.awsPath}/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
          name: this.unPicturify(item.name),
          note: item.info,
        });
        this.notFound = false;
        if(hash === this.unPicturify(item.name)){
          this.mainPic = index;
        }
        return item;
      });
    }
    else {
      this.notFound = true;
    }
    this.state = {
      mainPic : this.mainPic,
    };
  }
  initialize(set){
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.content = [];
    this.notFound = false;
    this.mainPic = 0;

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
    let hash = this.props.location.hash.replace('#', '');
    if(this.itemType !== undefined && this.itemType.dirs !== undefined){
      this.itemType.dirs.map((item,index)=>{
        this.content.push({
          image: `${this.awsPath}/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
          name: this.unPicturify(item.name),
          note: item.info,
        });
        this.notFound = false;
        if(hash === this.unPicturify(item.name)){
          this.mainPic = index;
        }
        return item;
      });
    }
    else {
      this.notFound = true;
    }
    if(set){
      this.setState({
        mainPic : this.mainPic,
      });
    }
  }
  componentDidMount(){
    if(!this.notFound){
      this.firstRef.current.focus();
    }
  }
  componentDidUpdate(){
    if(!this.notFound){
      this.firstRef.current.focus();
    }
  }

  handleKeyPress(e){
    if(e.keyCode === 87){
      this.scrollPic(1);
    }
    else if(e.keyCode === 81){
      this.scrollPic(0);
    }
  }
  scrollPic(dir){
    if(dir===0){
      this.mainPic = (this.state.mainPic+this.content.length-1) % this.content.length;
    }
    else {
      this.mainPic = (this.state.mainPic+this.content.length+1) % this.content.length;
    }
    this.setState({
      mainPic: this.mainPic,
    });
    this.props.history.push(`#${this.content[this.mainPic].name}`);


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
  setMainPic(index){
    this.setState({
      mainPic: index,
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
    else
    return (
      <div id="item"  >
          <div className='row'>
            <div className='col-10 offset-1'>
              <HistoryBar
                category = {this.category}
                type = {this.type}
                item = {this.item}
                unlinkify = {(str)=>this.unlinkify(str)}
              />
            </div>
          </div>
          <div className='row justify-content-center'>

            <div className='heading1 text-center'>
              {this.unlinkify(this.content[this.state.mainPic].name)}
            </div>
          </div>

          <div className='row justify-content-center'>
            <div className =' col-11'>
              <div className='row'>
                <div className="col-12 col-md-9">
                  <img className="img-fluid " src={`${this.content[this.state.mainPic].image}`} alt={this.content[this.state.mainPic].name}/>
                  <div className='text-center text-3'> {this.content[this.state.mainPic].note}</div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="row" id="list-tab" role="tablist">
                    {this.content.map((content, index)=>{

                      return <a onClick={()=>this.setMainPic(index) } ref={index===this.state.mainPic?this.firstRef:"none"} onKeyUp={(e)=>this.handleKeyPress(e)} key={`${index}`} className={index===this.state.mainPic?`list-group-item list-group-item-action border border-primary col-md-12 col-4`:`list-group-item list-group-item-action col-md-12 col-4`} id={`list-${content.name}-list`}  href={`#${content.name}`}  aria-controls={`${content.name}`} >

                          <div className='text-center'>
                          {this.unlinkify(content.name)}
                          </div>
                        </a>
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
