import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";
import "./Finder.css";

const API_URL = "https://api.github.com/";
const clientId = "e7fb68779637c8fcc5ba";
const clientSecret = "d8da657787e439861517f784a587b0e098ab3b6a";

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userRepos: [],
      showUserInfo: false,
      searching: false
    };
    this.getUser = this.getUser.bind(this);
  }

  // REFACTOR THIS FUNCTION
  getUser(userName) {
    this.setState({ searching: true, showUserInfo: false }, async () => {
      try {
        const userRes = await axios({
          method: "get",
          url: `${API_URL}users/${userName}`,
          data: {
            client_id: clientId,
            client_secret: clientSecret
          }
        });
        const reposRes = await axios({
          method: "get",
          url: `${API_URL}users/${userName}/repos?sort=created&direction=desc&per_page=5`,
          data: {
            client_id: clientId,
            client_secret: clientSecret
          }
        });
        const repos = reposRes.data.filter(r => r.fork === false);
        this.setState({
          user: userRes.data,
          userRepos: repos,
          searching: false,
          showUserInfo: true
        });
      } catch (err) {
        this.setState({ searching: false });
      }
    });
  }

  checkValue(value) {
    return value || "none ";
  }

  renderUserCard(user) {
    return (
      <UserCard
        userName={user.login}
        imageSrc={user.avatar_url}
        profileUrl={user.html_url}
        numFollowers={user.followers}
        numFollowing={user.following}
        numRepos={user.public_repos}
        companyName={this.checkValue(user.company)}
        blog={this.checkValue(user.blog)}
        location={this.checkValue(user.location)}
        bio={this.checkValue(user.bio)}
        memberSince={user.created_at}
      />
    );
  }

  renderUserRepos(repos) {
    return repos.map(repo => (
      <RepoCard
        key={repo.name}
        name={repo.name}
        description={this.checkValue(repo.description)}
        numForks={repo.forks_count}
        numWatchers={repo.watchers}
        numStarts={repo.stargazers_count}
        repoUrl={repo.html_url}
      />
    ));
  }

  render() {
    const { user, searching, showUserInfo, userRepos } = this.state;
    return (
      <div className="Finder">
        <SearchForm getUserInfo={this.getUser} />
        <CSSTransitionGroup
          transitionName="userInfo"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={150}
        >
          {showUserInfo && this.renderUserCard(user)}
          {showUserInfo && <h1 className="title">Latest Repos</h1>}
          {showUserInfo && this.renderUserRepos(userRepos)}
          {searching && (
            <div className="spin-wrapper">
              <div className="spinner"></div>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Finder;
