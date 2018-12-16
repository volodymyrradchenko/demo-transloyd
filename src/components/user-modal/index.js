import React, { Component } from 'react';
import fetchData from '../../decorators/fetchData';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components/macro';

const Modal = styled.div`
  /* display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  cursor: auto;

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }

  .modal-repos__item {
    list-style: none;
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

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
`;

class UserModal extends Component {
  static propTypes = {
    // from user-card component
    user: PropTypes.string.isRequired,
    sendRequest: PropTypes.func.isRequired,
    // from fectchData decorator
    isLoading: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    data: PropTypes.array
  };

  /**
   * @summary send request to server on mount
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { user, sendRequest } = this.props;
    sendRequest(user + '/repos?');
  }

  render() {
    const { isLoading, toggleModal, data = [] } = this.props;

    // if (isLoading) return <p>Loading...</p>;

    return (
      <Modal id="my-modal">
        <div className="modal-content">
          <span onClick={toggleModal} className="close">
            &times;
          </span>
          <h2>Repositories and their description</h2>
          {data !== null && data.length > 0 ? (
            <ul className="modal-repos__container">
              {data.map(item => (
                <li className="modal-repos__item" key={item.id}>
                  <a
                    href={item.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h4>{item.name}</h4>
                  </a>
                  <p>
                    Description:{' '}
                    {item.description ? item.description : 'no description'}
                  </p>
                  <p>
                    Language: {item.language ? item.language : 'no language'}
                  </p>
                </li>
              ))}
            </ul>
          ) : isLoading ? (
            <Spinner>
              <div className="lds-dual-ring" />
            </Spinner>
          ) : (
            <p>Nothing to show here :(</p>
          )}
        </div>
      </Modal>
    );
  }
}

const WrappedUserModal = fetchData(UserModal);

export default WrappedUserModal;
