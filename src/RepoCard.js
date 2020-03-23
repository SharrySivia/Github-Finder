import React, { Component } from "react";
import "./RepoCard.css";

class RepoCard extends Component {
  render() {
    const {
      name,
      description,
      repoUrl,
      numForks,
      numWatchers,
      numStarts
    } = this.props;
    return (
      <div className="RepoCard">
        <p className="RepoCard-title">
          <span>{name}</span> : {description}
        </p>
        <div className="RepoCard-labelsContainer">
          <div className="label">Forkes: {numForks}</div>
          <div className="label">Watchers: {numWatchers}</div>
          <div className="label">Starts: {numStarts}</div>
        </div>
        <a className="RepoCard-button" href={repoUrl} target="blank">
          Repo Page
        </a>
      </div>
    );
  }
}

export default RepoCard;
