import React, { Component } from 'react';
import UserList from '../user-list';
import SearchForm from '../search-form';

import fetchData from '../../decorators/fetchData';

import styled from 'styled-components/macro';

const GithubWrapper = styled.section`
  margin: 20px, 0;

  .search-form__container {
    /* background-color: coral; */
    margin: 20px 0;
    padding: 10px 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .user-list__container {
    margin: 20px 0;
    padding: 0;
    box-sizing: border-box;
    /* background-color: green; */
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

    const perPage = 20;
    const API = `https://api.github.com/search/users?per_page=${perPage}&page=1&q=${searchName}&`;

    if (isLoading) return <p>Loading...</p>;
    return (
      // TODO: add label for input with unique id
      <GithubWrapper>
        <div className="search-form__container">
          <SearchForm
            sendRequest={sendRequest.bind(this, API)}
            searchName={searchName}
            handleRequest={this.handleRequest}
          />
        </div>
        <div className="user-list__container">
          {data ? <UserList users={data.items} /> : null}
        </div>
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
