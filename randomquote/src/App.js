import React, { Component } from 'react';
const axios = require('axios');

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      quote:"",
      author:""
    }

    this.fetchData = this.fetchData.bind(this);
  }


  componentDidMount(){

   this.fetchData();

  }

fetchData(){

  axios('https://talaikis.com/api/quotes/random/')
    .then((res) => {

      this.setState({
        quote:res.data.quote,
        author:res.data.author
      })

  });

}
  
  render() {
    return (
      <div className="App">
        <p>{this.state.quote}</p>
        <p>{this.state.author}</p>
       {this.state.quote !== '' && 
       <input type='button'  value="reset" onClick={this.fetchData}/> 
        }
        {this.state.quote !== '' && <input type="button"  value="Tweet" />}
       
      </div>
    );
  }
}

export default App;
