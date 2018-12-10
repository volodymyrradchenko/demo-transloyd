import React, { Component } from 'react';

import styled from 'styled-components/macro';

const Card = styled.li`
  cursor: pointer;
  border: 1px solid;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;

  margin: 0;
  padding: 0;
  box-sizing: border-box;

  .user-card__image {
    height: 6.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 1rem));

    margin: 0;
    padding: 0;
  }

  .user-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-card__text {
    padding: 1rem;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }

  .user-card__text h2 {
    margin: 0;
    padding: 0;
  }

  /* .user-card__text p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem; */
  }
`;


class UserCard extends Component {

  render() {
    const {user} = this.props;

    return (
      <Card>
      <div class="user-card__image">
        <img src={user.avatar_url} alt=""/>
      </div>
      <div class="user-card__text">
      <h2>{user.login}</h2>
      </div>
      </Card>
    );
  }

}

export default UserCard;
