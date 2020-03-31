import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      matched: [],
      searching: false,
      showSuggestions: false
    };
    this.searchTimeOut = 0;
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.searchRepo = this.searchRepo.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getRepo = this.getRepo.bind(this);
  }

  handleChange(evt) {
    this.setState({ searchQuery: evt.target.value });
  }

  getUser(userName, profileUrl, reposUrl) {
    this.setState({ searchQuery: userName, showSuggestions: false });
    this.props.getUserInfo(profileUrl, reposUrl);
  }

  getRepo(repoName, repos_url) {
    this.setState({ searchQuery: repoName, showSuggestions: false });
    this.props.getRepoInfo(repos_url);
  }

  searchUser(evt) {
    if (this.searchTimeOut) clearTimeout(this.searchTimeOut);
    this.setState({ showSuggestions: false });
    if (evt.target.value && evt.keyCode !== 8) {
      this.searchTimeOut = setTimeout(async () => {
        this.setState({ searching: true });
        try {
          const res = await axios({
            method: "get",
            url: `https://api.github.com/search/users?q=${this.state.searchQuery}&per_page=25`,
            data: {
              client_id: this.props.clientID,
              client_secret: this.props.clientSecret
            }
          });

          const matchedNames = res.data.items.map(u => ({
            name: u.login,
            userProfieUrl: u.url,
            userReposUrl: u.repos_url
          }));
          this.setState({
            matched: [...matchedNames],
            searching: false,
            showSuggestions: true
          });
        } catch (err) {
          this.setState({ searching: false });
        }
      }, 300);
    }
  }

  searchRepo(evt) {
    if (this.searchTimeOut) clearTimeout(this.searchTimeOut);
    this.setState({ showSuggestions: false });
    if (evt.target.value && evt.keyCode !== 8) {
      this.searchTimeOut = setTimeout(async () => {
        this.setState({ searching: true });
        try {
          const res = await axios({
            method: "get",
            url: `https://api.github.com/search/repositories?q=${this.state.searchQuery}&per_page=25&sort=stars&order=desc`,
            data: {
              client_id: this.props.clientID,
              client_secret: this.props.clientSecret
            }
          });

          const matchedRepos = res.data.items.map(r => ({
            name: r.name,
            repoUrl: r.url
          }));
          this.setState({
            matched: [...matchedRepos],
            searching: false,
            showSuggestions: true
          });
        } catch (err) {
          this.setState({ searching: false });
        }
      }, 300);
    }
  }

  render() {
    const { searchQuery, searching, matched, showSuggestions } = this.state;
    const { searchFor } = this.props;
    const isUserSearch = searchFor === "searchUser";
    const title = isUserSearch ? "Search Github Users" : "Search Github Repos";
    const subtitle = isUserSearch
      ? "Enter username to fetch users profile info"
      : "Enter reponame to fetch repo info";

    let userNames = matched.map((data, i) => (
      <li
        key={i}
        onClick={() =>
          isUserSearch
            ? this.getUser(data.name, data.userProfieUrl, data.userReposUrl)
            : this.getRepo(data.name, data.repoUrl)
        }
      >
        {data.name}
      </li>
    ));
    return (
      <div className="SearchForm">
        <h1 className="SearchForm-title">{title}</h1>
        <p className="SearchForm-subtitle">{subtitle}</p>
        <div className="input-wrapper">
          <input
            className="SearchForm-input"
            type="text"
            placeholder="Enter name"
            value={searchQuery}
            onChange={this.handleChange}
            onKeyUp={isUserSearch ? this.searchUser : this.searchRepo}
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
