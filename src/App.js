import React, { Component } from 'react';
import './App.css';


class Header extends Component {
  render() {
    return (
      <div className="Header">
          <p id="welcomeText">Welcome to the Food App</p>
      </div>
    );
  }
}

class List extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const data  = this.props.recipes;
    var arr2 = Object.keys(data).map(function (i) {
      return <p>{data[i].title}</p>
    });
    return (
      <div id="Out">
        <div className="Header">
          {arr2}
        </div>
      </div>
    );
  }
}

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      ingredientName: '',
      recipes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    this.setState({ingredientName: event.target.value});

  }

  handleClick(event){
    fetch("https://www.food2fork.com/api/search?key=0b23e639e2a708b56e4e8cb0f575dfbf&page=1&q=" + this.state.ingredientName)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            recipes: result.recipes
          });
        }
      )
  }

  // componentDidMount(){
  //   fetch("https://www.food2fork.com/api/search?key=0b23e639e2a708b56e4e8cb0f575dfbf&q=lettuce&page=1")
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       this.setState({
  //         isLoaded: true,
  //         recipes: result.recipes
  //       });
  //     }
  //   )
  // }

  render() {
    return (
      <div id="container">
            <form id="MiddleLeft">
              <div className="Buttons">
                <p id="ingredientTitle">Enter Your Ingredients Below:</p>
                <div id="inputs">
                  <input type="text" id="box" value={this.state.ingredientName} onChange={this.handleChange}/>
                </div>
                <div id="buttons">
                  <button type="button" id="SubmitButton" onClick={this.handleClick}>Submit</button>
                </div>
              </div>
            </form>

        <div id="MiddleRight">
          <div id="OutputContainer">
            <p>Avaliable Recipes</p>
            <List recipes={this.state.recipes} />
          </div>
        </div>

      </div>
    )
  }
}

class Output extends Component {
  constructor(props){
    super(props);
  }

  render() {
    alert("inside Output render")
    alert(this.props.name)
    return (
      <h1>{this.props.name}</h1>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <div id="Top">
          <Header />
        </div>

        <div id="MiddleLeft">
          <User />
        </div>

      </div>
    );
  }
}

export default App;
