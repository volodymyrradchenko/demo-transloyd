import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../user-card';

import styled from 'styled-components/macro';

const GithubWrapper = styled.section`
    margin: 20px, 0;

  .user-card__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;

    list-style: none;
    margin: 20px 0;
    padding: 0;
    box-sizing: border-box;
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
          <label for="searchbar_id">Find Users:</label>
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
          {this.state.data ?

            <ul className="user-card__container">
            {this.state.data.items.map(item => (
            <UserCard user={item} key={item.id} />
          ))}
          </ul>
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
    const perPage = 20;
    const API = `https://api.github.com/search/users?per_page=${perPage}&page=1&q=${request}`;

    try {
      let response = await fetch(API).then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

      this.setState({ isLoading: false, data: response });
    } catch (error) {
      // console.error(error);
      this.setState({ isLoading: false, error: error.message });
    }
  }
}
