import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repos: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRepos = this.handleRepos.bind(this)
  }
  
 handleClick(e) {
   let user = this.refs.userInput.value;
   fetch(`https://api.github.com/users/${user}`)
     .then(res => res.json()).then(data => {
       console.log(data)
      this.setState({
        user: data
      })
    })
  }

  handleRepos(e){
    let user = this.state.user.login;
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        repos: data
      })
    })
  }

  render() {
    let {user} = this.state;
    let repos = this.state.repos.map((repo, i) =>(
      <li key={i}>{repo.name}</li>
    ))
    return( 
      <div>
        <h1>Search GitHub User</h1>
        <input type="text"
          name="searchedUser"
          ref="userInput" />
        <button onClick={this.handleClick}>
          Search
        </button>
        <div className="userDisplay">
          <h3> User: {user.login}</h3>
          <ul className="userList">
            <li>Repos: {user.public_repos} </li>
            <li>Followers: {user.followers}</li>
            <li>Following: {user.following}</li>
          </ul>
          <h3>Repos:<button onClick={this.handleRepos}>List Repos</button></h3>
          <ul>
            {repos}
          </ul>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))