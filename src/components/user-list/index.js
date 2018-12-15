import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';

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

class UserList extends Component {
  static propTypes = {
    // from github-user-search component
    users: PropTypes.array.isRequired
  };
  render() {
    let { users = [] } = this.props;
    console.log('---user-list', users);
    return (
      <UserCardContainer>
        {users.map(user => {
          return (
            <Suspense key={user.id} fallback={<p>User skeleton</p>}>
              <UserCard user={user.url} />
            </Suspense>
          );
        })}
      </UserCardContainer>
    );
  }
}

export default UserList;
