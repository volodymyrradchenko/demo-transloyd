import React, { Component as ReactComponent } from 'react';

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

    sendRequest = async api => {
      this.setState({
        isLoading: true
      });

        const GITHUB_AUTH = `client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;

        // const API = `https://api.github.com/${GITHUB_TOKEN}/search/users?per_page=${perPage}&page=1&q=${request}`;


        console.log('---fetch-data', api + GITHUB_AUTH)
      try {
        let result = await fetch(api + GITHUB_AUTH).then(response => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error('Bad response from server.');
          }
          return response.json()
        });

        this.setState({ data: result, isLoading: false });
      } catch(error) {

        console.error(error);
        this.setState({ isLoading: false })

        throw error;
      }
    }

  };
