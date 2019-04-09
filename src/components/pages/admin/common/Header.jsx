import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoPNG from '../../../../../public/images/logo.png';
import Logout from '../../../../../public/images/Logout@2x.png';
import Setting from '../../../../../public/images/Setting@2x.png';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';

const HeaderStyle = styled.div`
  font-size: 1.5em;
  background-color: #28C6BB;
  height: 60px;
  width: 100%;
  top: 0px;
`;

const InformationUser = styled.div`
  float: right;
  display: flex;
  align-items: center;
  padding-right: 40px;
  height: 100%;

`;

const FullName = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  // line-height: 22px;
  text-align: left;
`;

const Email = styled.p`
  color: #757575;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 5px;
  text-align: left;
`;

const Avatar = styled.div`
  border-radius: 50%;
  width: ${props => (props.width ? props.width : '40px')};
  height: ${props => (props.height ? props.height : '40px')};
  background-image: url(${props => props.url || ''});
  background-size: cover;
  float: left;
  cursor: pointer;
`;

const Name = styled.p`
  float: left;
  padding-right: 1em;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: right;
  margin: 0;
`;

const HeaderLogo = styled.div`
  background-color: #28C6BB;
  height: 100%;
  width: 300px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  display: block;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

const Profile = styled.div`
  height: 233px;
  width: 315px;
  background-color: #FFFFFF;
  position: absolute;
  z-index: 900;
  right: 30px;
  top: 60px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Icons = styled.i`
  position: absolute;
  color: #FFFFFF;
  right: 25px;
  top: -15px;
`;

const Info = styled.div`
  padding-top: 15px;
`;

const Item = styled.div`
  border-top: ${props => (props.border ? 'none' : '1px solid #E0E0E0')};
  height: ${props => (props.height ? props.height : '')};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.div`
  width: 30%
  padding: 0;
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  color: #616161;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  display: inline-block;
  margin: 0;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormProfile: false
    };
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.toogleOpenProfile = this.toogleOpenProfile.bind(this);
    this.handleCheckClickOutProfile = this.handleCheckClickOutProfile.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleCheckClickOutProfile);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleCheckClickOutProfile);
  }

  handleCheckClickOutProfile(event) {
    if (!this.myRef.current.contains(event.target) && !this.myRef2.current.contains(event.target)) {
      this.setState({
        showFormProfile: false
      });
    }
  }

  redirectToHome() {
    this.props.history.push('/');
  }

  toogleOpenProfile() {
    this.setState({
      showFormProfile: !this.state.showFormProfile
    });
  }

  render() {
    const { user } = this.props.user;
    const profile = user.profile;

    return (
      <div>
        <HeaderStyle>
          <HeaderLogo>
            <Link to="/" onClick={this.redirectToHome}>
              <Logo onClick={this.redirectToHome} alt="logo" src={LogoPNG} />
            </Link>
          </HeaderLogo>
          <InformationUser>
            <Name>{profile.full_name}</Name>
            <Avatar ref={this.myRef2} onClick={this.toogleOpenProfile} url={profile.avatar} />
          </InformationUser>
          <Profile show={this.state.showFormProfile} ref={this.myRef}>
            <Icons className="fa fa-caret-up" />
            <Item height="50%" border="none" className="col-md-12">
              <div>
                <Image className="col-md-3 text-center">
                  <Avatar width="80px" height="80px" url={profile.avatar} />
                </Image>
                <Info className="col-md-8">
                  <FullName>{profile.full_name}</FullName>
                  <Email>{user.email}</Email>
                </Info>
              </div>
            </Item>
            <Item height="25%" className="col-md-12">
              <Link to="/accounts" onClick={this.toogleOpenProfile}>
                <div>
                  <IconImg src={Setting} alt="setting" />
                  <Text>Profile Setting</Text>
                </div>
              </Link>
            </Item>
            <Item height="25%" className="col-md-12">
              <Link to="/logout" onClick={this.toogleOpenProfile}>
                <div>
                  <IconImg src={Logout} alt="logo" />
                  <Text>Log Out</Text>
                </div>
              </Link>
            </Item>
          </Profile>
        </HeaderStyle>
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

export default connect(mapStateToProps)(Header);
