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
      console.log('---fetch-data', api)
      this.setState({
        isLoading: true
      });

      try {
        let result = await fetch(api).then(response => {
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
