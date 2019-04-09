import React, { Component } from 'react';
import styled from 'styled-components';
import asyncComponent from '../../../asyncComponent';
import EditProfile from '../account/EditProfile';

const Profile = asyncComponent(() =>
  import('../account/profile').then(module => module.default)
);

const TextEditProfile = styled.span`
  color: #28C6BB;
  text-decoration: none;
  cursor: pointer;
`;

const TabContent = styled.div`
  border-radius: 4px;
  background-color: #FFFFFF;
  height: 100%;
  padding: 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
`;

const Content = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  background-color: #F6F8F9;
  padding-top: 40px;
`;

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'profile',
      editProfile: false
    };
    this.activeMenuByUrl = this.activeMenuByUrl.bind(this);
    this.activeMenuOnClick = this.activeMenuOnClick.bind(this);
    this.isActiveMenu = this.isActiveMenu.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  componentDidMount() {
    this.activeMenuByUrl();
  }

  activeMenuByUrl() {
    const url = window.location.pathname;
    const arrayUrl = url.split('/');

    if (!arrayUrl[2]) {
      this.setState({
        name: 'profile'
      });
    } else {
      this.setState({
        name: arrayUrl[2]
      });
    }
  }

  showEditForm() {
    this.setState({
      editProfile: !this.state.editProfile
    });
  }

  activeMenuOnClick(event) {
    this.setState({
      name: event.target.getAttribute('name')
    });
  }

  isActiveMenu(name) {
    if (this.state.name === name) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Content>
        <div className="col-md-12">
          <TabContent className="col-md-offset-2 col-md-8">
            <div className="col-md-12 text-right">
              {!this.state.editProfile ? <TextEditProfile onClick={this.showEditForm}>EDIT PROFILE</TextEditProfile> : ''}
            </div>
            {this.state.editProfile ? <EditProfile onClick={this.showEditForm} /> : <Profile />}
          </TabContent>
        </div>
      </Content>
    );
  }
}

export default AccountList;
