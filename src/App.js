import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components/macro';

const Title = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title className="styled-component__p">Edit <code>src/App.js</code> and save to reload.</Title>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
