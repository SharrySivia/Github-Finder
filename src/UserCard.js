import React, { Component } from "react";
import "./UserCard.css";

class UserCard extends Component {
  render() {
    const {
      userName,
      profileUrl,
      imageSrc,
      numFollowers,
      numFollowing,
      numRepos,
      companyName,
      blog,
      bio,
      location,
      memberSince
    } = this.props;
    return (
      <div className="UserCard">
        <div className="UserCard-userProfile">
          <h1 className="UserCard-title">{userName}</h1>
          <img className="UserCard-image" src={imageSrc} alt={userName} />
          <a className="UserCard-button" href={profileUrl} target="blank">
            View Profile
          </a>
        </div>
        <div className="UserCard-profileDetails">
          <div className="UserCard-labelsContainer">
            <div className="UserCard-label">Followers: {numFollowers}</div>
            <div className="UserCard-label">Following: {numFollowing}</div>
            <div className="UserCard-label">Repos: {numRepos}</div>
          </div>
          <div className="UserCard-detailsGroup">
            <p>
              <span>Company:</span>
              {companyName}
            </p>
            <p>
              <span>Website/Blog:</span>
              {blog}
            </p>
            <p>
              <span>Bio:</span>
              {bio}
            </p>
            <p>
              <span>Location:</span>
              {location}
            </p>
            <p>
              <span>Member Since:</span>
              {memberSince.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
