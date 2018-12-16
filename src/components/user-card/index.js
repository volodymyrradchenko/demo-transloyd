import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserModal from '../user-modal';

import fetchData from '../../decorators/fetchData';

import styled from 'styled-components/macro';

const Card = styled.li`
  cursor: pointer;
  /* border: 1px solid; */
  box-sizing: border-box;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;

  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 10px 16px 0 rgba(63,81,181,0.7),0 6px 20px 0 rgba(63,81,181,0.8);
  }

  .user-card__image {
    height: 6.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 1rem));
    border-radius: 0.25rem;

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
    word-break: break-all;

    margin: 0;
    padding: 0;
  }

  .user-card__text p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    word-wrap: break-all;
  }
  .user-card__text button {
    margin-top: auto;
    padding: 0.75rem;
    border: 1px solid;
    border-radius: 0.25rem;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 0.8;
    background-color: whitesmoke;
  }
`;

class UserCard extends Component {
  static propTypes = {
    // from user-list component
    user: PropTypes.string.isRequired,
    // from fetchData decorator
    data: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      bio: PropTypes.string,
    }),
    sendRequest: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  /**
   * @summary send a request to github on mount
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const {sendRequest, user = ''} = this.props;
    sendRequest(user + '?');
  }

  render() {
    const { data = {} } = this.props;

    return (data ? (
      <Card>
        <div className="user-card__image">
          <img src={data.avatar_url} alt="" />
        </div>
        <div className="user-card__text">
          <h2>{data.login}</h2>
          <p>{data.bio ? data.bio : '...no user info :('}</p>
          <button onClick={this.toggleModal}>Show repos</button>
          {this.getInfo()}
        </div>
      </Card>
    ) : null
    );
  }

  /**
   * toggleModal
   * @method
   * @summary a toggle function for UserModal component
   * @param ev - button on-click event
   */
  toggleModal = ev => {
    ev && ev.preventDefault && ev.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  /**
   * getInfo
   * @method
   * @summary gets executed when isOpen is triggered, returns modal component
   * @returns {String} - returns HTML
   */
  getInfo() {
    const { isOpen } = this.state;

    return (isOpen ? (
      <UserModal user={this.props.user} toggleModal={this.toggleModal.bind(this)}/>
    ) : null);
  }

}

const WrappedUserCard = fetchData(UserCard);

export default WrappedUserCard;
