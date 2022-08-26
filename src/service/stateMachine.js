import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const withApiState = TargetComponent =>
  class extends Component {
    state = {
      current: 'idle',
    };
    apiState = {
      pending: () => this.setState({ current: 'pending' }), 
      success: () => this.setState({ current: 'success' }),
      error: () => {
        console.log('error');
        this.setState({ current: 'error' });
      },
      idle: () => this.setState({ current: 'idle' }),
      isPending: () => this.state.current === 'pending', 
      isSuccess: () => this.state.current === 'success',
      isError: () => this.state.current === 'error',
      isIdle: () => this.state.current === 'idle',
    };

    render() {
      return <TargetComponent {...this.props} apiState={this.apiState} />;
    }
  };

withApiState.propTypes = {
  TargetComponent: PropTypes.func.isRequired,
};
