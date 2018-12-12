import React, { Component } from 'react';
import UserCard from '../user-card';
import styled from 'styled-components/macro';



const UserCardContainer = styled.ul `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;

    list-style: none;
    padding: 0;
`

class UserList extends Component {
  render() {
    let {users} = this.props;
    return (
      <UserCardContainer>
        {users.map(user => <UserCard user={user.url} key={user.id}/>)}
      </UserCardContainer>
    );
  }

}

export default UserList;
