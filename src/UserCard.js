import React, { Component } from "react";

class UserCard extends Component {
  render() {
    const {
      userName,
      imageSrc,
      numFollowers,
      numFollowing,
      numRepos
    } = this.props;
    return (
      <div>
        <h1>{userName}</h1>
        <img src={imageSrc} alt={userName} />
        <p>Followers: {numFollowers}</p>
        <p>Following: {numFollowing}</p>
        <p>Repos: {numRepos}</p>
      </div>
    );
  }
}

export default UserCard;
