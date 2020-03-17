import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ userName: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert(this.state.userName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="SearchForm">
        <input
          type="text"
          placeholder="search user"
          value={this.state.userName}
          onChange={this.handleChange}
          autoFocus
        />
        <button>Search</button>
      </form>
    );
  }
}

export default SearchForm;
