import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";
import "./Finder.css";

const clientId = "e7fb68779637c8fcc5ba";
const clientSecret = "d8da657787e439861517f784a587b0e098ab3b6a";

class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userRepos: [],
      repo: [],
      showUserInfo: false,
      searching: false,
      showRepoInfo: false
    };
    this.getUser = this.getUser.bind(this);
    this.getRepo = this.getRepo.bind(this);
  }


  getUser(profileUrl, reposUrl) {
    this.setState(
      { searching: true, showUserInfo: false, showRepoInfo: false },
      async () => {
        try {
            // search user query
            const userQuery = axiosQuery(profileUrl)

            // search repo's query
            const repoQuery = axiosQuery(`${reposUrl}?sort=created&direction=desc&per_page=5`)
            
            // using Promise.all to make multiple req at once
            const [userRes,reposRes] = await Promise.all([userQuery,repoQuery])   

            // save data in state
            this.setState({
                user: userRes.data,
                userRepos: reposRes.data.filter(r => r.fork === false),
                searching: false,
                showUserInfo: true
            });
            } catch (err) {
            this.setState({ searching: false });
            }
      }
      
    );
  }

  getRepo(repoUrl) {
    this.setState(
      { searching: true, showRepoInfo: false, showUserInfo: false },
     () => {
          axiosQuery(repoUrl).then(res=>{
            this.setState({
                searching: false,
                repo: res.data,
                showRepoInfo: true
            });
          }).catch(err=>{
              console.log(err.message)
          })
          
       
      }
    );
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

  renderRepoDetails(repo) {
    return (
      <RepoCard
        key={repo.name}
        name={repo.name}
        description={this.checkValue(repo.description)}
        numForks={repo.forks_count}
        numWatchers={repo.watchers}
        numStarts={repo.stargazers_count}
        repoUrl={repo.html_url}
      />
    );
  }

  render() {
    const {
      user,
      searching,
      showUserInfo,
      userRepos,
      repo,
      showRepoInfo
    } = this.state;

    const { search } = this.props;
    return (
      <div className="Finder">
        <SearchForm
          getUserInfo={this.getUser}
          getRepoInfo={this.getRepo}
          clientId={clientId}
          clientSecret={clientSecret}
          searchFor={search}
        />
        <CSSTransitionGroup
          transitionName="userInfo"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={150}
        >
          {showUserInfo && this.renderUserCard(user)}
          {showUserInfo && <h1 className="title">Latest Repos</h1>}
          {showUserInfo && this.renderUserRepos(userRepos)}
          {showRepoInfo && this.renderRepoDetails(repo)}
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

function axiosQuery(url){
    return axios({
            method: "get",
            url,
            data: {
              client_id: clientId,
              client_secret: clientSecret
            }
          })
}
