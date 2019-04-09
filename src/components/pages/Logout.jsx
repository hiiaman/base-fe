import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userActions } from '../../redux/actions/user';
import { UserService } from '../../services/user';
import IconLoading from '../../components/pages/admin/common/IconLoading';

class Logout extends Component {
  componentWillMount() {
    const { dispatch, user, history } = this.props;

    UserService.logout(user.access_token)
      .then(
        data => {
          dispatch(userActions.logout());
          location.reload();
        }
      )
      .catch(
        error => {
          dispatch(userActions.logoutFailure(error.response.data.description[0]));
          history.goBack();
        }
      );
  }

  render() {
    return (
      <IconLoading />
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { user } = state.authenticationReducer;
  return {
    user
  };
}

const connectedApp = connect(mapStateToProps)(Logout);

export { connectedApp as Logout };
