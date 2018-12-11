import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserList from '../user-list';
// import UserCard from '../user-card';

import styled from 'styled-components/macro';

const GithubWrapper = styled.section`
    margin: 20px, 0;
    form {
      background-color: coral;
    }
`;

export default class GithubUserSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
      error: null,

      request: ''
    };
  }

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    return (
      // TODO: add label for input with unique id
      <GithubWrapper>
        <form onSubmit={this.sendRequest.bind(this)}>
          <label htmlFor="searchbar_id">Find Users:</label>
          <input
            id="searchbar_id"
            name="search"
            type="search"
            value={this.state.request}
            onChange={this.handleRequest}
            placeholder="Search user..."
          />
          <button type="submit">Search</button>
        </form>
        {this.state.data ? (
          <UserList users={this.state.data.items} /> )
          : null}
        {this.state.error ? <p>{this.state.error}</p> : null}
      </GithubWrapper>
    );
  }

  handleRequest = ev => {
    this.setState({
      request: ev.target.value
    });
    console.log(ev.target.value);
  };

  async sendRequest() {
    this.setState({ isLoading: true });

    const { request } = this.state;
    const perPage = 1;
    // const GITHUB_TOKEN = `?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;
    // const API = `https://api.github.com/${GITHUB_TOKEN}/search/users?per_page=${perPage}&page=1&q=${request}`;

    const API = `https://api.github.com/search/users?per_page=${perPage}&page=1&q=${request}`;

    try {
      let result = await fetch(API).then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

      this.setState({ isLoading: false, data: result });
    } catch (error) {
      // console.error(error);
      this.setState({ isLoading: false, error: error.message });
    }
  }
}
