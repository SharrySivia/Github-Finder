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
    const userRes = await axios.get(`https://api.github.com/users/${userName}`);
    const reposRes = await axios.get(
      `https://api.github.com/users/${userName}/repos`
    );
    const repos = reposRes.data.filter(r => r.fork === false);
    this.setState({ user: userRes.data, userRepos: repos });
  }

  render() {
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
    } = this.state.user;
    return (
      <div>
        {/* Navbar goes here */}
        <SearchForm getUserInfo={this.getUser} />
        {this.state.user ? (
          <UserCard
            userName={name}
            imageSrc={avatar_url}
            profileUrl={html_url}
            numFollowers={followers}
            numFollowing={following}
            numRepos={public_repos}
            companyName={company}
            blog={blog}
            location={location}
            bio={bio}
            memberSince={created_at}
          />
        ) : null}
      </div>
    );
  }
}

export default Finder;
