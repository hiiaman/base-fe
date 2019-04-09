import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { registerActions } from '../../redux/actions/register';
import { UserService } from '../../services/user';
import AlertError from './admin/common/AlertError';
import BarLoading from './admin/common/BarLoading';
import LogoPNG from '../../../public/images/logIn-logo.png';
import {
  Logo,
  Header,
  Submit,
  RegisterInputs,
  StyledLink,
  Form,
  Input,
  LeftText,
  SocialLogin,
  SocialHeader,
  Bottom,
  FacebookButton,
  GoogleButton,
  FormHeader,
  FormContent,
  Icon
} from '../../styles/components/authenticate';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      firstname: '',
      lastname: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      firstname,
      lastname,
      email,
      password,
      password_confirmation
    } = this.state;

    dispatch(registerActions.request(email));

    UserService.register(email, password, firstname, lastname, password_confirmation)
      .then(
        data => {
          dispatch(registerActions.success(data.data));

          this.props.history.push('/login');
        }
      )
      .catch(
        error => {
          dispatch(registerActions.failure(error.response.data.description[0]));
        }
      );
  }

  render() {
    const { signingUp, error } = this.props;

    return (
      <div id="register">
        <Logo src={LogoPNG} alt="Logo" />
        <Form>
          {signingUp && <BarLoading />}
          <FormHeader>
            <Header>Sign up</Header>
          </FormHeader>
          <FormContent>
            <form>
              {error && <AlertError message={error} />}
              <RegisterInputs AuthBorder={error ? 'red' : '#BDBDBD'}>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        defaultValue={this.state.firstname}
                        onChange={this.handleInputChange}
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        id="lastname"
                        defaultValue={this.state.lastname}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
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
                    <td colSpan="2">
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        defaultValue={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <Input
                        type="password"
                        name="password_confirmation"
                        placeholder="Retype Password"
                        defaultValue={this.state.password_confirmation}
                        onChange={this.handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </RegisterInputs>
              <Submit type="submit" onClick={this.handleSubmit}>SIGN UP</Submit>
            </form>
            <LeftText>By creating an account, you agree to our Terms</LeftText>
            <SocialLogin>
              <SocialHeader>Sign up with</SocialHeader>
              <FacebookButton className="btn"><Icon className="fa fa-facebook" />Facebook</FacebookButton>
              <GoogleButton className="btn"><Icon className="fa fa-google-plus" />Google</GoogleButton>
            </SocialLogin>
            <br />
            <Bottom>Do you have an account? <StyledLink to="/login">SIGN IN</StyledLink></Bottom>
          </FormContent>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: propTypes.func.isRequired
};

function mapStateToProps(state) {
  const { loggedIn, signingUp, error } = state.registerReducer;

  return {
    loggedIn,
    signingUp,
    error
  };
}

const connectedApp = connect(mapStateToProps)(Register);

export { connectedApp as Register };
