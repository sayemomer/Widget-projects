import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      minute:25,
      second:60
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

  startPomodoro(event) {
     event.preventDefault();
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  pausePomodoro(event){
    event.preventDefault();
    clearInterval(this.intervalId);
  }

  stopPomodoro(event){
    clearInterval(this.intervalId);
    this.setState({
      minute:25,
      second:60
      });
  }

  setTimeUpPomodoro(event){
    this.setState({ minute: this.state.minute + 1});

  }

  setTimeDownPomodoro(event){
    this.setState({ minute : this.state.minute - 1});

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
                              Pomodoro
                            </p>
                            <a  className="card-header-icon" aria-label="more options">
                              <span className="icon">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                              </span>
                            </a>
                          </header>

                          <div className="card-content">

                            <div className="content">
                              <i class="fas fa-plus" onClick={ this.setTimeUpPomodoro.bind(this)}></i>
                              <p>({ this.state.minute } : {this.state.second})</p>
                              <i class="fas fa-minus"onClick={ this.setTimeDownPomodoro.bind(this)}></i>
                            </div>

                          </div>

                          <footer className="card-footer">
                            
                            <a  className="card-footer-item" onClick={this.startPomodoro.bind(this)}>start</a>
                            <a  className="card-footer-item"onClick={this.pausePomodoro.bind(this)}>Pause</a>
                            <a  className="card-footer-item" onClick={this.stopPomodoro.bind(this)}>end</a>
                            
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
