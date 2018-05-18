
import React, { Component } from 'react';
import directoryData from '../data/directory';
import attributeNotes from '../data/attributeNotes';
import HistoryBar from './HistoryBar';
import {Link} from "react-router-dom";

class Item extends Component {

  constructor(props){
    super(props);
    this.firstRef= React.createRef();
    this.imageRef= React.createRef();
    this.popupRectRef= React.createRef();
    this.zoomRectRef= React.createRef();
    this.zoomRef= React.createRef();
    this.category = this.props.match.params.category;
    this.type = this.props.match.params.type;
    this.item = this.props.match.params.item;
    this.content = [];
    this.notFound = false;
    this.mainPic = 0;
    this.menuCat= this.find(directoryData, this.category);
    this.keyListenerRef = (e) => {this.handleKeyPress(e)};

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
          image: `${this.category}/${this.type}/${this.itemType.name}/${item.name}`,
          name: this.unPicturify(item.name),
          Note: item.info,
          seating: item.seating,
          Seat : item.seat,
          Frame_Color : item.frame_color,
          Back_Color : item.back_color,
          tags : item.tags,
          angles : item.angles,
          Color : item.color,
          Thickness : item.thickness,
          Image_Info: item.image_info,
          size : item.size,
          edge: item.edge,
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
      largePopup : false,
      largePopupSrc : "",
      allView: false,
    };
    this.mainKeysCustom = ["image","name", "tags", "seating", "angles", "size", "edge"];
    this.mainKeys = Object.keys(this.content[this.mainPic]).filter(key=> (!this.mainKeysCustom.includes(key)));
  //  console.log(this.mainKeys);
  }


  componentDidMount(){
    // if(!this.notFound){
    //   this.firstRef.current.focus();
    //
    // }
    window.addEventListener("resize", this.reinitializeImage.bind(this));
    window.addEventListener('scroll', this.reinitializeImage.bind(this));
    window.addEventListener('keyup', this.keyListenerRef);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.reinitializeImage);
    window.removeEventListener('scroll', this.reinitializeImage.bind(this));
    window.removeEventListener('keyup', this.keyListenerRef);
  }

  reinitializeImage(){
    let magnification = 2.5;
    if(this.mainImage){
      this.imageRect = this.mainImage.getBoundingClientRect();
      this.popupRectWidth = this.imageRect.width/magnification;
      this.popupRectHeight = this.imageRect.height/magnification;
      if(this.popupRectRef.current){
        this.popupRectRef.current.style.width = this.popupRectWidth + "px";
        this.popupRectRef.current.style.height = this.popupRectHeight + "px";
        this.popupImgWidth = this.imageRect.width*magnification;
        this.popupImgHeight = this.imageRect.height*magnification;
      }
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
    if(this.state.zoomPopup && this.popupRectRef.current){
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

      this.zoomRectRef.current.style.height = this.imageRect.height+"px";
      this.zoomRef.current.style.margin = `${topper*this.popupImgWidth}px 0% 0% ${lefter*this.popupImgWidth}px`;
    }
    else if (e.clientX> this.imageRect.left && e.clientX < this.imageRect.right && e.clientY> this.imageRect.top && e.clientY < this.imageRect.bottom ){
      this.setState({
        zoomPopup:  true,
      });
    }

  }
  setZoomPopup(b){
    this.setState({
      zoomPopup: b,
    });
  }
  componentDidUpdate(){
  }

  setAllView(){
    let b = this.state.allView;
    this.setState({
      allView : !b,
    });
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
    if(e.keyCode === 87  && !this.state.largePopup){
      this.scrollPic(1);
    }
    else if(e.keyCode === 81 && !this.state.largePopup){
      this.scrollPic(0);
    }
    else if(e.keyCode === 27 && this.state.largePopup){
      this.setLargePopup("none");
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

  setMainPic(index){
    this.setState({
      mainPic: index,
    });
    this.mainKeys = Object.keys(this.content[this.mainPic]).filter(key=> (!this.mainKeysCustom.includes(key)));

  }
  setLargePopup(src){
    let booler = !this.state.largePopup;
    this.setState({
      largePopup: booler,
      largePopupSrc: src
    });
  //  console.log(src);
  }
  find(arr, target){
    for (var i =0; i < arr.length; i++){
      if(arr[i].name === target){
        return arr[i];
      }
    }
    console.log(`error [${target}] was not found`);
    return arr[0];
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
      <div id="item" >

          <div id='large-popup-black' onClick={()=>this.setLargePopup("none")} className={(this.state.largePopup?'':'d-none')}></div>
          <div id='large-popup-holder' className={`row justify-content-center bg-light border border-secodary border-3 `+(this.state.largePopup?'':'d-none')}>
            <img id="large-popup-img"  className='col-12 img-fluid' src={this.state.largePopupSrc} alt={this.content[this.state.mainPic].name}/>
          </div>
          <div id="large-popup-x" onClick={()=>this.setLargePopup("none")} className={`btn btn-primary rounded-circle `+(this.state.largePopup?'':'d-none')} > X </div>

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
          <div className='row'>
            <div className =' col-10 offset-1'>
              <div  id="all-view" className='row'>
                <div onClick={()=>this.setAllView()} className='btn btn-primary'>
                  {this.state.allView?
                    <span>&#42779; Hide Picture View &#42779;</span>
                    :
                    <span>&#42780; Show Picture View &#42780;</span>
                  }
                </div>
              </div>
              <div className={'row ' + (`${this.state.allView?'':' d-none'}`)}>
                <div id = "all-view-popup" className='col-12 bg-secondary'>
                  <div className='row'>
                    {this.content.map((content,index)=>{
                      return <a href={`#${content.name}`}  onClick={()=>this.setMainPic(index)} className={'col-3 border ' + (`${this.state.mainPic === index?'bg-dark':''}`)}>
                        <img className="img-fluid-1"  onClick={()=>this.setAllView()} src={`${this.props.commonVars.awsPath}/icon/${content.image}`} alt={content.name}/>
                        <div className="text-center text-md text-white"> {content.name} </div>
                      </a>
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className='row justify-content-center'>
            <div className =' col-11'>
              <div className="row mt-2  mb-2" id="list-tab" role="tablist">
                {this.content.map((content, index)=>{

                  return <a onClick={()=>this.setMainPic(index) } ref={index===this.state.mainPic?this.firstRef:"none"}  key={`${index}`} className={'item-img-holder list-group-item list-group-item-action col-md-2 col-3 p-1 rounded-40 border '+(index===this.state.mainPic?` border-primary bg-dark text-light`:``)+ (content.tags && content.tags.includes("clearance")?" bg-danger":"")} id={`list-${content.name}-list`}  href={`#${content.name}`}  aria-controls={`${content.name}`} >
                      <div className='text-center'>
                        {this.unlinkify(content.name)}
                      </div>
                    </a>
                })}

              </div>
              <div className='heading1 text-center'>
                {this.unlinkify(this.content[this.state.mainPic].name)}
              </div>
              <div className='row'>
                <div className="col-12 col-md-6 ">
                    <img id="item-img-main" onLoad = {this.imageSetup.bind(this)}  ref={this.imageRef} onMouseMove={this._onMouseMove.bind(this)} onClick={()=>this.setLargePopup(this.content[this.state.mainPic].image)} onMouseEnter={()=> this.setZoomPopup(true)} onMouseLeave={()=>this.setZoomPopup(false)} className="img-fluid-1 border d-none d-md-block" src={`${this.props.commonVars.awsPath}/image/${this.content[this.state.mainPic].image}`} alt={this.content[this.state.mainPic].name}/>
                    <img id="item-img-main" onClick={()=>this.setLargePopup(this.content[this.state.mainPic].image)} className="img-fluid-1 border d-block d-md-none" src={`${this.props.commonVars.awsPath}/image/${this.content[this.state.mainPic].image}`} alt={this.content[this.state.mainPic].name}/>
                    {this.content[this.state.mainPic].tags && this.content[this.state.mainPic].tags.includes("clearance")?
                      <img className='item-img-overlay' src={`${this.props.commonVars.awsPath}/image/!icon/clearance.png`} alt='clearance'/>
                      :
                      <div></div>
                    }
                  <div className='d-none d-md-block '>
                    <div id='zoom-popup-rect' ref={this.popupRectRef} className={this.state.zoomPopup?"":"d-none"}> </div>
                  </div>

                </div>
                <div className="col-12 col-md-6">



                  <div id='crop' ref={this.zoomRectRef} className={`'border d-none  ' + ${(this.state.zoomPopup?"d-md-block":"")}`} >
                    <img className='zoom-popup' ref={this.zoomRef} src={`${this.props.commonVars.awsPath}/image/${this.content[this.state.mainPic].image}`} alt='zoomed in'/>
                  </div>
                  <div id='item-info' className='row'>
                    {this.mainKeys.map((keyz,index)=>{
                      return <div key={`main-key-${index}`} className='col-12  m-0'>
                      {this.content[this.state.mainPic][keyz] !== null && this.content[this.state.mainPic][keyz] !== "" && this.content[this.state.mainPic][keyz] !== undefined?

                        `${this.unlinkify(keyz)}: ` + this.content[this.state.mainPic][keyz]

                      : <div></div> }
                      </div>
                    })}

                    {this.content[this.state.mainPic].seating === null || this.content[this.state.mainPic].seating === undefined?
                      <div> </div>
                      :
                      <div className='col-12  mb-0'> Seating Options
                        <div className='row'>
                        {this.content[this.state.mainPic].seating.map((seat,index)=>{
                          let seatData = this.find(this.find(attributeNotes,"seating").data,seat);
                          return <div key={`325-div-${index}`} className='card col-3'>
                            <img onClick={()=>this.setLargePopup(`${this.props.commonVars.awsPath}/image/${seatData.image}`)} className="card-img-top " src={`${this.props.commonVars.awsPath}/icon/${seatData.image}`} alt={seatData.name}/>
                              <div className='row justify-content-center'>
                                <div className="text-muted text-center">{seatData.name}</div>
                              </div>
                          </div>
                        })}
                        </div>
                      </div>
                    }
                    {this.content[this.state.mainPic].size === null || this.content[this.state.mainPic].size === undefined ?
                      <div> </div>
                      :
                      <div className='col-12  mb-0'> Size Options
                        <div className='row'>
                        {this.content[this.state.mainPic].size.map((size,index)=>{
                          let sizeData = this.find(this.find(attributeNotes,"size").data,size);
                          return <div key={`sizing-div-${index}`} className='card col-2'>
                            <img onClick={()=>this.setLargePopup(`${this.props.commonVars.awsPath}/image/${sizeData.image}`)} className="card-img-top " src={`${this.props.commonVars.awsPath}/icon/${sizeData.image}`} alt={size}/>
                              <div className='row justify-content-center'>
                                <div className="text-muted text-center text-1 ">{size}</div>
                              </div>
                          </div>
                        })}
                        </div>
                      </div>
                    }
                    {this.content[this.state.mainPic].edge === null || this.content[this.state.mainPic].edge === undefined ?
                      <div> </div>
                      :
                      <div className='col-12  mb-0'> Edge Options
                        <div className='row'>
                        {this.content[this.state.mainPic].edge.map((edge,index)=>{
                          let edgeData = this.find(this.find(attributeNotes,"edge").data,edge);
                          return <div key={`edge-div-${index}`} className='card col-2'>
                            <img onClick={()=>this.setLargePopup(`${this.props.commonVars.awsPath}/image/${this.props.commonVars.awsPath}/${edgeData.image}`)} className="card-img-top " src={`${this.props.commonVars.awsPath}/icon/${this.props.commonVars.awsPath}/${edgeData.image}`} alt={edge}/>
                              <div className='row justify-content-center'>
                                <div className="text-muted text-center text-1 ">{edge}</div>
                              </div>
                          </div>
                        })}
                        </div>
                      </div>
                    }
                    {this.content[this.state.mainPic].angles === null || this.content[this.state.mainPic].angles === undefined?
                      <div> </div>
                      :
                      <div className='col-12  mb-0'> Angles
                        <div className='row'>
                        {this.content[this.state.mainPic].angles.map((angle,index)=>{
                          return <div key={`angle-div-${index}`} className='card col-3'>
                            <img onClick={()=>this.setLargePopup(`${this.props.commonVars.awsPath}/image/${this.category}/!Angle/${angle}.png`)} className="card-img-top " src={`${this.props.commonVars.awsPath}/icon/${this.category}/!Angle/${angle}.png`} alt="angle"/>

                          </div>
                        })}
                        </div>
                      </div>
                    }
                    {this.find(attributeNotes,"tags").data.map((tag,index)=>{
                      if(this.content[this.state.mainPic].tags && this.content[this.state.mainPic].tags.includes(tag.name)){
                        return <div key={`${index}-${tag.name}`} className={`col-12 ${tag.textFont}`}>
                          {tag.note}
                        </div>
                      }
                    })}
                    {this.content[this.state.mainPic].tags === null || this.content[this.state.mainPic].tags === undefined?
                      <div> </div>
                      :
                      <div className='col-12  mb-0'> Tags
                        <div className='row'>
                        {this.content[this.state.mainPic].tags.map((tag,index)=>{
                          return <Link to={`/Search?itemCode=${tag}`} key={`tag-div-${index}`} className='ml-1 mr-1'>
                            <div className = "btn btn-primary"> {tag} </div>
                          </Link>
                        })}
                        </div>
                      </div>
                    }
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
