import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from './header';
import GithubUserSearch from './github-user-search';

import styled from 'styled-components/macro';

const MainContent = styled.main`
    grid-area: main;
    box-sizing: border-box;
    margin: 0 auto;
    width: 70%;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainContent>
          <GithubUserSearch />
        </MainContent>
      </div>
    );
  }
}

export default App;
