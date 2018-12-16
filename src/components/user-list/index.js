import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components/macro';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 20px 0;
  text-align: center;

  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #cef;
    border-color: #cef transparent #cef transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
  h3 {
    text-align: center;
  }
`;

// import UserCard from '../user-card';
const UserCard = lazy(() => import('../user-card'));

const UserCardContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;

  list-style: none;
  padding: 0;
`;

const NothingFound = styled.h3`
    text-align: center;
`

class UserList extends Component {
  static propTypes = {
    // from github-user-search component
    users: PropTypes.array.isRequired
  };
  render() {
    let { users = [] } = this.props;
    console.log('---user-list', users);
    return users.length > 0 ? (
      <UserCardContainer>
        {users.map(user => {
          return (
            <Suspense
              key={user.id}
              fallback={
                <Spinner>
                  <div className="lds-dual-ring" />
                </Spinner>
              }
            >
              <UserCard user={user.url} />
            </Suspense>
          );
        })}
      </UserCardContainer>
    ) : <NothingFound>No results found :( You can try a different search term.</NothingFound>
  }
}

export default UserList;
