
import React, { Component } from 'react';
import directoryData from '../data/directory';
import HistoryBar from './HistoryBar';

class Item extends Component {

  constructor(props){
    super(props);
    this.firstRef= React.createRef();
    this.imageRef= React.createRef();
    this.popupRectRef= React.createRef();
    this.zoomRef= React.createRef();
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.content = [];
    this.notFound = false;
    this.mainPic = 0;
    this.menuCat= this.find(directoryData, this.category);


    if(this.menuCat !== undefined && this.menuCat.dirs !== undefined){
      this.menuType= this.find(this.menuCat.dirs, this.type);
    }
    else {
      this.notFound = true;
    }

    if(this.menuType !== undefined && this.menuType.dirs !== undefined){
      this.itemType= this.find(this.menuType.dirs, this.item);
    }
    else {
      this.notFound = true;
    }
    let hash = this.props.location.hash.replace('#', '');
    if(this.itemType !== undefined && this.itemType.dirs !== undefined){
      this.itemType.dirs.map((item,index)=>{
        this.content.push({
          image: `${this.props.commonVars.awsPath}/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
          name: this.unPicturify(item.name),
          note: item.info,
          seating: item.seating,
          seat : item.seat,
          frame_color : item.frame_color
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
      zoomPopup : false,
    };
  }
  // initialize(set){
  //   this.category = this.props.match.params.category;
  //   this.type = this.props.match.params.type;
  //   this.item = this.props.match.params.item;
  //   this.content = [];
  //   this.notFound = false;
  //   this.mainPic = 0;
  //
  //   this.menuCat= this.find(directoryData, this.category);
  //
  //
  //   if(this.menuCat !== undefined && this.menuCat.dirs !== undefined){
  //     this.menuType= this.find(this.menuCat.dirs, this.type);
  //   }
  //   else {
  //     this.notFound = true;
  //   }
  //
  //   if(this.menuType !== undefined && this.menuType.dirs !== undefined){
  //     this.itemType= this.find(this.menuType.dirs, this.item);
  //   }
  //   else {
  //     this.notFound = true;
  //   }
  //   let hash = this.props.location.hash.replace('#', '');
  //   if(this.itemType !== undefined && this.itemType.dirs !== undefined){
  //     this.itemType.dirs.map((item,index)=>{
  //       this.content.push({
  //         image: `${this.props.commonVars.awsPath}/image/${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
  //         name: this.unPicturify(item.name),
  //         note: item.info,
  //         seating: item.seating,
  //         seat : item.seat,
  //         frame_color : item.frame_color
  //       });
  //       this.notFound = false;
  //       if(hash === this.unPicturify(item.name)){
  //         this.mainPic = index;
  //       }
  //       return item;
  //     });
  //   }
  //   else {
  //     this.notFound = true;
  //   }
  //   if(set){
  //     this.setState({
  //       mainPic : this.mainPic,
  //     });
  //   }
  // }

  componentDidMount(){
    // if(!this.notFound){
    //   this.firstRef.current.focus();
    //
    // }
    window.addEventListener("resize", this.reinitializeImage.bind(this));
    window.addEventListener('scroll', this.reinitializeImage.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.reinitializeImage.bind(this));
    window.removeEventListener('scroll', this.reinitializeImage.bind(this));
  }

  reinitializeImage(){
    let magnification = 2.5;
    if(this.mainImage){
      this.imageRect = this.mainImage.getBoundingClientRect();
      this.popupRectWidth = this.imageRect.width/magnification;
      this.popupRectHeight = this.imageRect.height/magnification;
      this.popupRectRef.current.style.width = this.popupRectWidth + "px";
      this.popupRectRef.current.style.height = this.popupRectHeight + "px";
      this.popupImgWidth = this.imageRect.width*magnification;
      this.popupImgHeight = this.imageRect.height*magnification;
    }
  }


  imageSetup(e){
    let magnification = 2.5;
    this.mainImage = e.target;
    this.imageRect = e.target.getBoundingClientRect();
    this.popupRectWidth = this.imageRect.width/magnification;
    this.popupRectHeight = this.imageRect.height/magnification;
    this.popupRectRef.current.style.width = this.popupRectWidth + "px";
    this.popupRectRef.current.style.height = this.popupRectHeight + "px";
    this.popupImgWidth = this.imageRect.width*magnification;
    this.popupImgHeight = this.imageRect.height*magnification;


  }
  _onMouseMove(e){
    if(this.state.zoomPopup){
      this.popupRectRef.current.style.left = (e.clientX-this.popupRectWidth/2)  + "px";
      this.popupRectRef.current.style.top = (e.clientY-this.popupRectHeight/2) + "px";
      if(parseFloat(this.popupRectRef.current.style.left) < this.imageRect.left){
        this.popupRectRef.current.style.left = this.imageRect.left+"px";
      }
      else if(parseFloat(this.popupRectRef.current.style.left)+this.popupRectWidth > this.imageRect.right){
        this.popupRectRef.current.style.left = this.imageRect.right-this.popupRectWidth+"px";
      }
      if(parseFloat(this.popupRectRef.current.style.top) < this.imageRect.top){
        this.popupRectRef.current.style.top = this.imageRect.top+"px";
      }
      else if(parseFloat(this.popupRectRef.current.style.top)+this.popupRectHeight > this.imageRect.bottom){
        this.popupRectRef.current.style.top = this.imageRect.bottom-this.popupRectHeight+"px";
      }
      let lefter = -1*(parseFloat(this.popupRectRef.current.style.left)-this.imageRect.left)/(this.imageRect.width);
      let topper = -1*(parseFloat(this.popupRectRef.current.style.top)-this.imageRect.top)/(this.imageRect.height);

      //this.zoomRef.current.style.margin = `${topper}% ${righter}% ${botter}% ${lefter}%`;

      this.zoomRef.current.style.width = this.popupImgWidth+"px";
      this.zoomRef.current.style.height = this.popupImgHeight+"px";
      this.zoomRef.current.style.margin = `${topper*this.popupImgWidth}px 0% 0% ${lefter*this.popupImgWidth}px`;
    }
  }
  setZoomPopup(b){
    this.setState({
      zoomPopup: b,
    });
  }
  componentDidUpdate(){
    if(!this.notFound){
      this.firstRef.current.focus();
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
    this.props.history.replace(`#${this.content[this.mainPic].name}`);


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
  // checkRefresh(str){
  //   if(str !== this.type){
  //     this.initialize(true);
  //   }
  //   return "";
  // }
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
                search = {this.props.commonVars.search}
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
                <div className="col-12 col-md-6">
                  <img onLoad = {this.imageSetup.bind(this)} id="item-img-main" ref={this.imageRef} onMouseMove={this._onMouseMove.bind(this)} onMouseEnter={()=> this.setZoomPopup(true)} onMouseLeave={()=>this.setZoomPopup(false)} className="img-fluid border" src={`${this.content[this.state.mainPic].image}`} alt={this.content[this.state.mainPic].name}/>
                  <div className='d-none d-md-block'>
                    <div id='zoom-popup-rect' ref={this.popupRectRef} className={this.state.zoomPopup?"":"d-none"}> </div>
                  </div>
                  <div className='text-center text-3'> {this.content[this.state.mainPic].note}</div>

                </div>
                <div className="col-12 col-md-6">
                  <div className="row" id="list-tab" role="tablist">
                    {this.content.map((content, index)=>{

                      return <a onClick={()=>this.setMainPic(index) } ref={index===this.state.mainPic?this.firstRef:"none"} onKeyUp={(e)=>this.handleKeyPress(e)} key={`${index}`} className={index===this.state.mainPic?`list-group-item list-group-item-action border border-primary col-md-4 col-4`:`list-group-item list-group-item-action col-md-4 col-4`} id={`list-${content.name}-list`}  href={`#${content.name}`}  aria-controls={`${content.name}`} >

                          <div className='text-center'>
                          {this.unlinkify(content.name)}
                          </div>
                        </a>
                    })}

                  </div>
                  {this.state.zoomPopup?
                    <div id='crop' className='border d-none d-md-block '>
                      <img className='zoom-popup' ref={this.zoomRef} src={`${this.content[this.state.mainPic].image}`} alt='zoomed in'/>
                    </div>
                  :

                  <div id='item-info' className='row'>
                    {this.content[this.state.mainPic].frame_color === null?
                      <div> </div>
                      :
                      <div className='col-12'>
                        Frame Color : {this.content[this.state.mainPic].frame_color}
                      </div>
                    }
                    {this.content[this.state.mainPic].seat === null?
                      <div> </div>
                      :
                      <div className='col-12'>
                        Seat : {this.content[this.state.mainPic].seat}
                      </div>
                    }
                    {this.content[this.state.mainPic].seating === null?
                      <div> </div>
                      :
                      <div className='col-12'> Seating Options
                        <div className='row'>
                        {this.content[this.state.mainPic].seating.map((seat,index)=>{
                          return <div key={`325-div-${index}`} className='card col-3'>
                            <img className="card-img-top " src={`/${seat.image}`} alt={seat.name}/>
                              <div className='row justify-content-center'>
                                <div className="text-muted text-center">{seat.name}</div>
                              </div>
                          </div>
                        })}
                        </div>
                      </div>
                    }
                  </div>
                  }

                </div>
              </div>
            </div>
          </div>
      </div>

    );
  }
}

export default Item;
