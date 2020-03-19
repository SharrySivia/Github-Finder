import React, { Component } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserCard from "./UserCard";

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", userRepos: [] };
    this.getUser = this.getUser.bind(this);
  }

  async getUser(userName) {
    const UserRes = await axios.get(`https://api.github.com/users/${userName}`);
    const reposRes = await axios.get(
      `https://api.github.com/users/${userName}/repos`
    );
    const repos = reposRes.data.filter(r => r.fork === false);
    this.setState({ user: UserRes.data, userRepos: repos });
  }

  render() {
    const {
      name,
      avatar_url,
      followers,
      following,
      public_repos
    } = this.state.user;
    return (
      <div>
        <h1>GitHub Finder..</h1>
        <SearchForm getUserInfo={this.getUser} />
        {this.state.user ? (
          <UserCard
            userName={name}
            imageSrc={avatar_url}
            numFollowers={followers}
            numFollowing={following}
            numRepos={public_repos}
          />
        ) : null}
      </div>
    );
  }
}

export default Finder;
