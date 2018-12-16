import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';

const Form = styled.form`
  flex: 0 0 100%;

  display: flex;
  flex-wrap: wrap;

  /* justify-content: center;

  align-items: center; */

  max-width: 600px;

  .visually-hidden {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px);
    /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
  }

  input {
    box-sizing: border-box;
    background: #E9E9E9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.35em 0.75em;
    border: none;
    font-size: 1.1em;
    text-decoration: none;
    line-height: normal;
    max-height: 3em;

    flex: 2 0 70%;
  }

  button {
    box-sizing: border-box;
    border-radius: 0px 2px 2px 0px;
    background: #8b798c;
    font-weight: 300;
    text-transform: uppercase;
    color: white;
    padding: 0.35em 0.75em;
    border: none;
    font-size: 1.1em;
    text-decoration: none;
    cursor: pointer;

    flex: 1 0 30% ;
  }
  button:hover {
	   background: #C17CCF;
}
`;

class SearchForm extends Component {
  static propTypes = {
    // from github-user-search component
    searchName: PropTypes.string.isRequired,
    handleRequest: PropTypes.func.isRequired,
    sendRequest: PropTypes.func.isRequired,
  }
  render() {
    const { sendRequest, searchName = '', handleRequest } = this.props;

    return (
      <Form onSubmit={sendRequest}>
        <label htmlFor="searchbar_id" className="visually-hidden">
          Find Users:
        </label>
        <input
          id="searchbar_id"
          name="search"
          type="search"
          value={searchName}
          onChange={handleRequest}
          placeholder="GitHub user search..."
          autoFocus={true}
        />
        <button type="submit">Search</button>
      </Form>
    );
  }
}

export default SearchForm;
