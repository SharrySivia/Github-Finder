import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";
import "./Finder.css";

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
    this.setState({ searching: true }, async () => {
      try {
        const userRes = await axios.get(
          `https://api.github.com/users/${userName}`
        );
        const reposRes = await axios.get(
          `https://api.github.com/users/${userName}/repos?sort=created&direction=desc&per_page=5`
        );
        const repos = reposRes.data.filter(r => r.fork === false);
        this.setState({
          user: userRes.data,
          userRepos: repos,
          searching: false,
          showUserInfo: true
        });
      } catch (err) {
        // this.setState({ searching: false });
      }
    });
  }

  checkValue(value) {
    return value || "none ";
  }

  renderUserCard(user) {
    return (
      <UserCard
        userName={user.name}
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
      <div>
        <SearchForm getUserInfo={this.getUser} />
        <CSSTransitionGroup
          transitionName="userInfo"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {searching && (
            <div className="spin-wrapper">
              <div className="spinner"></div>
            </div>
          )}

          {showUserInfo && this.renderUserCard(user)}
          {showUserInfo && this.renderUserRepos(userRepos)}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Finder;
