import React, { Component as ReactComponent } from 'react';

/**
 * @file FetchData is a React Component wrapper. Any functionality from FetchData should be available in wrapped component out of the box.
 *
 * @module FetchData
 * @extends Component
 * @param OriginalComponent
 */


export default OriginalComponent =>
  class FetchData extends ReactComponent {
    state = {
      data: null,
      isLoading: false,
    };

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          sendRequest={this.sendRequest}
        />
      );
    }

    /**
     * sendRequest
     * @method
     * @async
     * @summary perform a server request by providing api as a string
     * @return {Promise<Object>} response - return data from the server or throw an error
     * @param {String} api  - url to download from
     */
    sendRequest = async api => {
      this.setState({
        isLoading: true
      });

        const GITHUB_AUTH = process.env.REACT_APP_GITHUB_ID && process.env.REACT_APP_GITHUB_SECRET ?
        `client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}` :
        '';

        // const API = `https://api.github.com/${GITHUB_TOKEN}/search/users?per_page=${perPage}&page=1&q=${request}`;


        console.log('---fetch-data', api + GITHUB_AUTH);
      try {
        let result = await fetch(api + GITHUB_AUTH).then(response => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error('Bad response from server.');
          }
          // console.log('---response', response.json().length)
          return response.json()
        });

        this.setState({ data: result, isLoading: false });
      } catch(error) {

        console.log('---fetchData-error', error);
        this.setState({ isLoading: false })

        throw error;
      }
    }

  };
