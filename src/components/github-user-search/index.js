import React, { Component } from 'react';
import UserList from '../user-list';

import fetchData from '../../decorators/fetchData';

import styled from 'styled-components/macro';

const GithubWrapper = styled.section`
    margin: 20px, 0;
    form {
      background-color: coral;
    }
`;

class GithubUserSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchName: ''
    };
  }

  render() {
    const { searchName } = this.state;
    const { data, isLoading, sendRequest } = this.props;

    const perPage = 10;
    const API = `https://api.github.com/search/users?per_page=${perPage}&page=1&q=${searchName}`;


    if (isLoading) return <p>Loading...</p>;
    return (
      // TODO: add label for input with unique id
      <GithubWrapper>
        <form onSubmit={sendRequest.bind(this, API)}>
          <label htmlFor="searchbar_id">Find Users:</label>
          <input
            id="searchbar_id"
            name="search"
            type="search"
            value={searchName}
            onChange={this.handleRequest}
            placeholder="Search user..."
          />
          <button type="submit">Search</button>
        </form>
        {data ? (
          <UserList users={data.items} /> )
          : null}
      </GithubWrapper>
    );
  }

  handleRequest = ev => {
    this.setState({
      searchName: ev.target.value
    });
  };

}

const WrappedGithubUserSearch = fetchData(GithubUserSearch);

export default WrappedGithubUserSearch;
