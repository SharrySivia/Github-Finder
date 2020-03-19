import React, { Component } from "react";
import axios from "axios";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", matched: [] };
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async handleChange(evt) {
    this.setState({ userName: evt.target.value });
  }

  getUser(userName) {
    this.setState({ userName: userName, matched: [] });
    this.props.getUserInfo(userName);
  }

  async searchUser() {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${this.state.userName}`
    );
    const matchedNames = res.data.items.map(u => u.login);
    this.setState({
      matched: [...matchedNames]
    });
  }

  render() {
    let userNames = this.state.matched.map((userName, i) => (
      <li key={i} onClick={() => this.getUser(userName)}>
        {userName}
      </li>
    ));
    return (
      <div className="SearchForm">
        <input
          className="SearchForm-input"
          type="text"
          placeholder="search user"
          value={this.state.userName}
          onChange={this.handleChange}
          onKeyUp={this.searchUser}
          autoFocus
        />
        {this.state.matched.length ? (
          <ul className="suggestions">{userNames}</ul>
        ) : null}
      </div>
    );
  }
}

export default SearchForm;
