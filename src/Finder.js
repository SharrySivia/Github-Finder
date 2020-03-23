import React, { Component } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";
import "./Finder.css";

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", userRepos: [], searching: false };
    this.getUser = this.getUser.bind(this);
  }

  async getUser(userName) {
    this.setState({ searching: true });
    try {
      const userRes = await axios.get(
        `https://api.github.com/users/${userName}`
      );
      const reposRes = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );
      const repos = reposRes.data.filter(r => r.fork === false);
      this.setState({ user: userRes.data, userRepos: repos, searching: false });
    } catch (err) {
      this.setState({ searching: false });
    }
  }

  checkValue(value) {
    return value || "Null";
  }

  renderUserCard(user) {
    const {
      name,
      avatar_url,
      html_url,
      followers,
      following,
      public_repos,
      company,
      blog,
      location,
      bio,
      created_at
    } = user;
    return (
      <UserCard
        userName={name}
        imageSrc={avatar_url}
        profileUrl={html_url}
        numFollowers={followers}
        numFollowing={following}
        numRepos={public_repos}
        companyName={this.checkValue(company)}
        blog={this.checkValue(blog)}
        location={this.checkValue(location)}
        bio={this.checkValue(bio)}
        memberSince={created_at}
      />
    );
  }

  render() {
    const { user } = this.state;
    const repos = this.state.userRepos.map(repo => (
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
    return (
      <div>
        <SearchForm getUserInfo={this.getUser} />
        {this.state.searching ? (
          <div className="spin-wrapper">
            <div className="spinner"></div>
          </div>
        ) : this.state.user ? (
          this.renderUserCard(user)
        ) : null}
        {repos}
      </div>
    );
  }
}

export default Finder;
