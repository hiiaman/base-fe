import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Avatar from 'react-avatar-edit';
import CameraPNG from '../../../../../public/images/camera@3x.png';
import { userActions } from '../../../../redux/actions/user';
import { AuthenticatedRequest } from '../../../../services/api';
import asyncComponent from '../../../asyncComponent';
import { UPDATE_PROFILE } from '../../../../constants/common';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';

const PopUp = asyncComponent(() =>
  import('../common/PopUpForm').then(module => module.default)
);

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

const AvatarContent = styled.div`
  margin-bottom: 40px;
  padding-left: 0;
  display: flex;
  justify-content: center;
  padding-right: 0px;
`;

const AvatarImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${props => props.url || ''});
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CameraContent = styled.div`
  position: absolute;
  background-color: #FFFFFF;
  width: 30%;
  height: 30%;
  bottom: -15%;
  right: 35%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InputGroup = styled.div`

`;

const CameraImage = styled.img`
  width: 60%;
  display: block;
`;

const Input = styled.input`
    padding: 1em;
    width: 90%;
    line-height: normal;
    font-size: 16px;
    height:30px;
    border: none; /* <-- This thing here */
    border:solid 1px #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    :focus {
      outline:0px !important;
      -webkit-appearance:none;
    }
`;

const Label = styled.p`
  color: #9E9E9E;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  font-family: Roboto;
`;

const InformationContent = styled.div`
  padding-left: 30px;
  @media (max-width: 992px) {
    padding-left: 0;
  }
`;

const LableChangePass = styled.label`
  font-weight: 400;
  margin: 0 0 0 5px;
`;

const CheckBoxForm = styled.div`
  color: #28C6BB;
  font-size: 14px;
  font-weight: 100;
  padding-left: 45px;
  margin-bottom: 30px;
  font-family: Roboto;
`;

const Button = styled.div`
  padding-left: 30px;
`;

const Icons = styled.i`
  color: #BDBDBD;
  margin-left: -20px;
`;

const Message = styled.div`
  padding-left: 45px;
`;

const Submit = styled.button`
  display: inline-block;
  margin: 30px auto;
  background-color: ${props => (props.border ? 'none' : '#28C6BB')};
  border-radius: 28px;
  width: 30%;
  height: 38px;
  color: ${props => (props.border ? '#28C6BB' : '#FFFFFF')};
  font-family: Roboto;
  font-size: 15px;
  font-weight: 200;
  line-height: 19px;
  text-align: center;
  border-color: transparent;
  margin-left:15px;
  border: ${props => (props.border ? '1px solid #28C6BB' : 'none')};

  :focus {
    outline:0px !important;
    -webkit-appearance:none;
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      avatar: '',
      showPopup:false,
      preview: null,
      src: '',
      update: false,
      doneAvatar: false,
      user: '',
      error: '',
      showInfo: false,
      changeProfile: {
        firstname: this.props.user.user.profile.firstname,
        lastname: this.props.user.user.profile.lastname,
        avatar: '',
        checked: false,
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    };
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.getUserInfo = this.getUserInfo.bind(this);
    this.showPopUpChangeAvatar = this.showPopUpChangeAvatar.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEraser = this.handleInputEraser.bind(this);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const { user } = this.props.user;
    const profile = user.profile;

    this.setState({
      fullname: profile.full_name,
      email: user.email,
      avatar: profile.avatar
    });
  }

  showPopUpChangeAvatar() {
    return this.setState({
      showPopup: !this.state.showPopup
    });
  }

  closeModal() {
    this.setState({
      showPopup: false,
      preview: this.state.preview,
      doneAvatar: false
    });
  }

  onClose() {
    this.setState({ preview: null });
  }
  
  onCrop(preview) {
    this.setState({ preview });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'change_password') {
      this.setState({
        changeProfile: {
          ...this.state.changeProfile,
          checked: !this.state.changeProfile.checked
        }
      });
    } else {
      this.setState({ 
        changeProfile : {
          ...this.state.changeProfile,
          [name]: target.value
        }
      });
    }
  }

  handleInputEraser(event) {
    const target = event.target.getAttribute('data-input');

    if (target === 'firstname') {
      this.firstName.current.value = '';
    } else {
      this.lastName.current.value = '';
    }
  }

  handleSubmitAvatar() {
    this.setState({
      doneAvatar: true,
      changeProfile: {
        ...this.state.changeProfile,
        avatar: this.state.preview
      }
    });

    this.closeModal();
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    AuthenticatedRequest(this.props.user.access_token)
      .post(UPDATE_PROFILE, this.state.changeProfile)
      .then(
        response => {
          const obj = this.props.user;
          obj.user.profile = response.data.data;
          dispatch(userActions.updateProfile(obj));
          this.setState({
            showInfo: true
          });
          if (typeof this.props.onClick === 'function') {
            this.props.onClick();
          }
        }
      )
      .catch(
        error => {
          this.setState({
            error: error.response.data.description.join('\n')
          });
        }
      );
  }

  showEditForm(e) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e.target.value);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Message className="col-lg-offset-3 col-lg-9 text-left">
            {this.state.showInfo &&
              <AlertError
                type="alert-info"
                message="You have change profile successfully."
                timeDuration={4000}
              />
            }
            {this.state.error &&
              <AlertError
                message={this.state.error}
                timeDuration={0}
              />
            }
          </Message>
          <AvatarContent className="col-md-3">
            <AvatarImage url={this.state.changeProfile.avatar ? this.state.changeProfile.avatar : this.state.avatar}>
              <CameraContent onClick={this.showPopUpChangeAvatar}>
                <CameraImage src={CameraPNG} alt="camera" />
              </CameraContent>
            </AvatarImage>
          </AvatarContent>
          <div className="col-lg-9">
            <InformationContent >
              <Label>FIRST NAME</Label>
              <InputGroup>
                <Input
                  name="firstname"
                  placeholder="First Name"
                  defaultValue={this.props.user.user.profile.firstname}
                  onChange={this.handleInputChange}
                  ref={this.firstName}
                />
                <Icons className="fa fa-times-circle" data-input="firstname" onClick={this.handleInputEraser} />
              </InputGroup>
              <InputGroup>
                <Label>LAST NAME</Label>
                <Input
                  name="lastname"
                  placeholder="Last Name"
                  defaultValue={this.props.user.user.profile.lastname}
                  onChange={this.handleInputChange}
                  ref={this.lastName}
                />
                <Icons className="fa fa-times-circle" data-input="lastname" onClick={this.handleInputEraser} />
              </InputGroup>
            </InformationContent>
          </div>
          <CheckBoxForm className="col-lg-offset-3 col-lg-9">
            <input 
              id="checkbox" 
              type="checkbox"
              name="change_password"
              checked={this.state.changeProfile.checked}
              onChange={this.handleInputChange}
            />
            <LableChangePass htmlFor="checkbox">Change Password</LableChangePass>
          </CheckBoxForm>
          {this.state.changeProfile.checked ?
            <div className="col-lg-offset-3 col-lg-9">
              <form>
                <InformationContent>
                  <InputGroup>
                    <Label>CURRENT PASSWORD</Label>
                    <Input
                      type="password"
                      name="current_password"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>NEW PASSWORD</Label>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>RETYPE NEW PASSWORD</Label>
                    <Input
                      type="password"
                      name="password_confirmation"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </InformationContent>
              </form>
            </div> : ''
          }
          <Button className="col-lg-offset-3 col-lg-9">
            <Submit border={'true'} onClick={this.showEditForm}>CANCEL</Submit>
            <Submit onClick={this.handleSubmit}>SAVE</Submit>
          </Button>
        </div>
        <PopUp
          header="Change Avatar"
          content={ 
            <Avatar
              width={'100%'}
              height={295}
              onCrop={this.onCrop}
              onClose={this.onClose}
              src={this.state.src}
            /> 
          }
          open={this.state.showPopup}
          functionClose={this.closeModal}
          submitMessage={'Done'}
          handleSubmit={this.handleSubmitAvatar}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authenticationReducer;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
