import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      matched: [],
      searching: false,
      showSuggestions: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async handleChange(evt) {
    this.setState({ userName: evt.target.value });
  }

  getUser(userName) {
    this.setState({ userName: userName, showSuggestions: false });
    this.props.getUserInfo(userName);
  }

  async searchUser() {
    this.setState({ searching: true });
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${this.state.userName}&per_page=15`
      );
      const matchedNames = res.data.items.map(u => u.login);
      this.setState({
        matched: [...matchedNames],
        searching: false,
        showSuggestions: true
      });
    } catch (err) {
      this.setState({ searching: false });
    }
  }

  render() {
    const { userName, searching, matched, showSuggestions } = this.state;

    let userNames = matched.map((userName, i) => (
      <li key={i} onClick={() => this.getUser(userName)}>
        {userName}
      </li>
    ));
    return (
      <div className="SearchForm">
        <h1 className="SearchForm-title">Search Github users</h1>
        <p className="SearchForm-subtitle">
          Enter username to fetch users profile info
        </p>
        <div className="input-wrapper">
          <input
            className="SearchForm-input"
            type="text"
            placeholder="Github username"
            value={userName}
            onChange={this.handleChange}
            onKeyUp={this.searchUser}
            autoFocus
          />
          {searching && <div className="donut"></div>}
          <CSSTransitionGroup
            transitionName="suggestions"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {showSuggestions && <ul className="suggestions">{userNames}</ul>}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default SearchForm;
