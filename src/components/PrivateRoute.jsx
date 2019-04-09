import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class PrivateRoute extends Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.dispatch(push('/login'));
    }
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn && this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authenticationReducer;
  return {
    loggedIn
  };
}

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const connectedApp = connect(mapStateToProps)(PrivateRoute);
export { connectedApp as PrivateRoute };
