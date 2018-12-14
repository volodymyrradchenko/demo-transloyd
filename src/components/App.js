import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.css';
import Header from './header';
import GithubUserSearch from './github-user-search';
import ErrorBoundary from './error-boundary';

import styled from 'styled-components/macro';

const MainContent = styled.main`
  grid-area: main;
  box-sizing: border-box;
  margin: 0 auto;
  width: 70%;
`;

class App extends Component {
  render() {
    // TODO: debug ErrorBoundary error catcher
    return (
      <div>
        <Header />
        <ErrorBoundary>
          <MainContent>
            <GithubUserSearch />
          </MainContent>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
