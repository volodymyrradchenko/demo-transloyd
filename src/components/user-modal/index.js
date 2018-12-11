import React, { Component } from 'react';
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

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
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
  state = {
    data: null,
    isLoading: false,
    error: ''
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const API = this.props.user + '/repos';

    try {
      const result = await fetch(API).then(response => {
        console.log(response.data);
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

      this.setState({
        data: result,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isLoading: false, error: error.message });
    }
  }

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;

    return (
      <Modal id="myModal">
        <div className="modal-content">
          <span onClick={this.props.toggleModal} className="close">
            &times;
          </span>
          <p>Some text in the Modal..</p>
          {this.state.data ?

            <ul className="modal-repos__container">
            {this.state.data.map(item => (
            <li key={item.id}>
              <a href={item.html_url}><h4>{item.name}</h4></a>
              <p>{item.description}</p>
              <p>Lenguage: {item.language}</p>
            </li>
          ))}
          </ul>
          : null}
        </div>
      </Modal>
    );
  }
}

export default UserModal;
