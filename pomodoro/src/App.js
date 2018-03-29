import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      minute:25,
      second:60,
      stage:"Pomodoro",
      ability:true
    }
  }


  secondMeter(){
    this.setState({ second : this.state.second - 1 });
  }

  minuteMeter(){
    this.setState({ minute : this.state.minute - 1 });

    if( this.state.minute === -1 ){
      this.stopPomodoro();
    }

    this.setState({ second : 60 });

  }

  timer() {
    if( this.state.second === 0){
      this.minuteMeter();
    }
    else{
      this.secondMeter();
    }
  }
  
  toogleVisibility(){
    this.setState({ ability : !this.state.ability});
  }

  startPomodoro(event) {
    event.preventDefault();
    this.toogleVisibility();
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  pausePomodoro(event){
    event.preventDefault();
    clearInterval(this.intervalId);
    this.toogleVisibility();
  }

  stopPomodoro(event){
    clearInterval(this.intervalId);
    if( this.state.stage === "Pomodoro"){
      this.setState({
        minute:5,
        second:60,
        stage:"Break"});
    }
    else{
      this.setState({
        minute:25,
        second:60,
        stage:"Pomodoro"});
      }
  }

 

  setTimeUpPomodoro(event){
    if( this.state.minute < 25){
      this.setState({ minute: this.state.minute + 1});
      
    }
  }

  setTimeDownPomodoro(event){
    if(this.state.minute >0 ){
      this.setState({ minute : this.state.minute - 1});
    } 
  }

  

  render() {
    return (
      <div className="App">
        <div class="columns">
          <div class="column is-one-third">
          </div>
          <div class="column">
              <div className="card">
                          <header className="card-header">
                            <p className="card-header-title">
                            <span> {this.state.stage}</span>
                            </p>
                          
                          </header>

                          <div className="card-content">

                            <div className="content">
                              <i class="fas fa-plus" onClick={ this.setTimeUpPomodoro.bind(this)}></i>
                              <p className="App-text">({ this.state.minute } : {this.state.second})</p>
                              <i class="fas fa-minus"onClick={ this.setTimeDownPomodoro.bind(this)}></i>
                              
                            </div>
                          </div>

                          <footer className="card-footer">
                             <a  className="card-footer-item is-dark button" onClick={this.startPomodoro.bind(this)} disabled={!this.state.ability} >Start</a> 
                            <a  className="card-footer-item is-dark button"onClick={this.pausePomodoro.bind(this)}>Pause</a>
                            <a  className="card-footer-item  is-dark button" onClick={this.stopPomodoro.bind(this)}>end</a>
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
