import React, { Component } from 'react';
import UserModal from '../user-modal';

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
    word-break: break-all;

    margin: 0;
    padding: 0;
  }

  /* .user-card__text p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem; */
  }
`;

// const Modal = styled.div`
//   /* display: none; /* Hidden by default */
//   position: fixed; /* Stay in place */
//   z-index: 1; /* Sit on top */
//   left: 0;
//   top: 0;
//   width: 100%; /* Full width */
//   height: 100%; /* Full height */
//   overflow: auto; /* Enable scroll if needed */
//   background-color: rgb(0, 0, 0); /* Fallback color */
//   background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
//
//   /* Modal Content/Box */
//   .modal-content {
//     background-color: #fefefe;
//     margin: 15% auto; /* 15% from the top and centered */
//     padding: 20px;
//     border: 1px solid #888;
//     width: 80%; /* Could be more or less, depending on screen size */
//   }
//
//   /* The Close Button */
//   .close {
//     color: #aaa;
//     float: right;
//     font-size: 28px;
//     font-weight: bold;
//   }
//
//   .close:hover,
//   .close:focus {
//     color: black;
//     text-decoration: none;
//     cursor: pointer;
//   }
// `;

class UserCard extends Component {
  state = {
    user: null,
    isOpen: false,

    isLoading: false,
    error: null,
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const API = this.props.user;

    try {
      const result = await fetch(API).then(response => {
        console.log('user-card', response);
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

      this.setState({
        user: result,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false, error: error.message });
    }
  }

  // state = {
  //   isOpen: false
  // };

  render() {
    const { user } = this.state;
    console.log(user);

    return (this.state.user ? (
      <Card>
        <div className="user-card__image">
          <img src={user.avatar_url} alt="" />
        </div>
        <div className="user-card__text">
          <h2>{user.login}</h2>
          <p>{user.bio ? user.bio : 'no user info'}</p>
          <button onClick={this.toggleModal}>Info</button>
          {this.getInfo()}
        </div>
      </Card>
    ) : null
    );
  }

  toggleModal = ev => {
    ev && ev.preventDefault && ev.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getInfo() {
    const { isOpen } = this.state;
    // const { user } = this.props;

    return (isOpen ? (
      <UserModal user={this.props.user} toggleModal={this.toggleModal.bind(this)}/>
      // <Modal id="myModal">
      //   <div className="modal-content">
      //     <span onClick={this.toggleModal} className="close">&times;</span>
      //     <p>Some text in the Modal..</p>
      //   </div>
      // </Modal>
    ) : null);
  }




}

export default UserCard;
