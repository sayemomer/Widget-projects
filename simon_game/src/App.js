import React, { Component } from 'react';
import './App.css';
var _ =require('lodash');
const tiles=["One","Two","Three","Four"];

class App extends Component {


  constructor(){
    super();

    this.state={
      tileOne:"Black",
      tileTwo:"Black",
      tileThree:"Black",
      tileFour :"Black",
      stage:0,
      totalStage:0,
      randomBox:[],
      point:0,
      simonBar:0,
      progress:0
    }

  }
  

  randomBox(randonTile){
    const tile=`tile${randonTile}`;
    this.setState({ [tile]:"Grey"});
    setTimeout( ()=>this.setState({ [tile]:"Black"}),1000);
  }

  setRandomBox(){
    if( this.state.stage === this.state.totalStage  ){
      this.stopSimon();
    }
    else{
      this.setState({stage: this.state.stage + 1 });
      const random=_.random(0, 3);
      this.setState({ randomBox:[...this.state.randomBox,random] });
      this.randomBox( tiles[random]);
    } 
  }

  setTotalStage(){
    const random = _.random(0,5);
    this.setState({ totalStage: random });
  }

  startSimon(){
    this.setTotalStage();
    this.myInterval = setInterval(this.setRandomBox.bind(this),1000);
  }

  stopSimon(){
    clearInterval(this.myInterval);
    this.clear();
  }

  clearRandom(){

    this.setState({
      point:0,
      simonBar:0,
      randomBox:[]
      });

    
  }

  clear(){

    this.setState({
      stage: 0,
      totalStage :0
      });
  }

  progress(){

    let randomBox=[...this.state.randomBox] ;
    let point = this.state.point+1 ;

    if( point === randomBox.length ){
      this.setState({ progress : this.state.progress + 25 });
      this.clearRandom();
  }

  }


  simonBarClicker(){

    if( this.state.randomBox.length !==0  ){
      this.setState({ simonBar: this.state.simonBar +1  });
    }
    
  }


  
  checkSimon(event){

    this.simonBarClicker();
    let randomBox=[...this.state.randomBox] ;
    let index =this.state.simonBar;

        if( randomBox[index] === _.toNumber(event.target.id) ){     
          this.setState({ point: this.state.point +  1 });
          this.progress();
        }
        else{

          this.setState({
            point:0,
      simonBar:0,
            });
          
        }

  }

  
  
  render() {
    return (
      <div className="App">
        <div class="columns">
          <div class="column is-one-third">
          </div>
          <div class="column">

          <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Score : { this.state.point }
      <progress class="progress" value={this.state.progress} max="100"> </progress>
    </p>
    <a  class="card-header-icon" aria-label="more options">
      
    </a>
  </header>
  <div class="card-content ">
    <div class="content flex-container">
      <div className={this.state.tileOne} onClick={this.checkSimon.bind(this)} id="0"></div>
      <div className={this.state.tileTwo} onClick={this.checkSimon.bind(this)} id="1" ></div>
      <div className={this.state.tileThree} onClick={this.checkSimon.bind(this)} id="2"></div>
      <div className={this.state.tileFour} onClick={this.checkSimon.bind(this)} id="3"></div>
    </div>
  </div>
  <footer class="card-footer">
    <a  class="card-footer-item" onClick={this.startSimon.bind(this)}>Start</a>
    <a  class="card-footer-item" onClick={this.stopSimon.bind(this)} >Stop</a>
  </footer>
</div>

</div>
          <div class="column"></div>
</div>

</div>
    );
  }


}

export default App;
