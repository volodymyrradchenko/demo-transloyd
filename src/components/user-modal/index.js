import React, { Component } from 'react';
import fetchData from '../../decorators/fetchData';

import styled from 'styled-components/macro';

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

class UserModal extends Component {
  async componentDidMount() {
    const {user, sendRequest} = this.props;
    sendRequest(user + '/repos?');
  }

  render() {
    const {isLoading, toggleModal, data } = this.props;

    if (isLoading) return <p>Loading...</p>;

    return (
      <Modal id="myModal">
        <div className="modal-content">
          <span onClick={toggleModal} className="close">
            &times;
          </span>
          <p>Some text in the Modal..</p>
          {data ?

            <ul className="modal-repos__container">
            {data.map(item => (
            <li className="modal-repos__item" key={item.id}>
              <a href={item.html_url}><h4>{item.name}</h4></a>
              <p>Description: {item.description ? item.description : 'no description'}</p>
              <p>Lenguage: {item.language ? item.language : 'no language'}</p>
            </li>
          ))}
          </ul>
          : null}
        </div>
      </Modal>
    );
  }
}

const WrappedUserModal = fetchData(UserModal);

export default WrappedUserModal;
