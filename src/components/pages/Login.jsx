import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { UserService } from '../../services/user';
import { userActions } from '../../redux/actions/user';
import AlertError from './admin/common/AlertError';
import BarLoading from './admin/common/BarLoading';
import LogoImage from '../../../public/images/logIn-logo.png';
import {
  Logo,
  Header,
  Submit,
  Form,
  Input,
  LoginInputs,
  // SocialLogin,
  // SocialHeader,
  // StyledLink,
  // Bottom,
  // FacebookButton,
  // GoogleButton,
  FormHeader,
  FormContent
  // Icon
} from '../../styles/components/authenticate';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  handelSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(userActions.request(email));

    UserService.login(email, password)
      .then(
        data => {
          dispatch(userActions.success(data.data));

          this.props.history.push('/');
        }
      )
      .catch(
        error => {
          dispatch(userActions.failure(error.response.data.description[0]));
        }
      );
  }

  render() {
    const { loggingIn, error, isNew } = this.props;
    return (
      <div id="login">
        <Logo src={LogoImage} alt="Logo" />
        <Form>
          {loggingIn && <BarLoading />}
          <FormHeader>
            <Header>Sign In</Header>
          </FormHeader>
          <FormContent>
            <form>
              {isNew &&
                <AlertError
                  type="alert-info"
                  message="You have created your account successfully. Please wait for the verification email."
                  timeDuration={4000}
                />
              }
              {error && <AlertError type="alert-danger" message={error} />}
              <LoginInputs AuthBorder={error ? 'red' : '#BDBDBD'}>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        defaultValue={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </LoginInputs>
              <br />
              {/* <StyledLink to="/forget-password">Forget Password?</StyledLink> */}
              <Submit type="submit" onClick={this.handelSubmit}>SIGN IN</Submit>
            </form>
            {/* <SocialLogin>
              <SocialHeader>Sign up with</SocialHeader>
              <FacebookButton className="btn"><Icon className="fa fa-facebook" />Facebook</FacebookButton>
              <GoogleButton className="btn"><Icon className="fa fa-google-plus" />Google</GoogleButton>
            </SocialLogin> */}
            <br />
            {/* <Bottom>Do you have an account? <StyledLink to="/register">SIGN UP</StyledLink></Bottom> */}
          </FormContent>
        </Form>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { loggedIn, loggingIn, error } = state.authenticationReducer;
  const { isNew } = state.registerReducer;

  return {
    loggedIn,
    loggingIn,
    error,
    isNew
  };
}
const connectedApp = connect(mapStateToProps)(Login);

export { connectedApp as Login };
