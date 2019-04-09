import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../../styles/components/nav-menu.css';
import { NotificationAction } from '../../../../redux/actions/notification';
import NotificationBadge from '../common/NotificationBadge';
import { API_TOTAL_TASK_NEW } from '../../../../constants/common';
import { AuthenticatedRequest } from '../../../../services/api';
// import TaskRequestPNG from '../../../../../public/images/TaskRequest.png';
import ClientListPNG from '../../../../../public/images/client-list.png';
// import ReportingPNG from '../../../../../public/images/reporting.png';
// import AccountPNG from '../../../../../public/images/account.png';

const Main = styled.div`
  width: 300px;
  float: left;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
`;

const Content = styled.nav`
  width: 300px;
`;

const NavMenu = styled.ul`
  list-style-type: none;
  padding: 40px 0 0 0;
  margin: 0 auto;
  text-align: left;
`;

const Item = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: ${props => props.ActiveColor || 'white'};
  border-left: 3px solid ${props => props.ActiveBorder || 'white'};
`;

const ImageFrame = styled.div`
  height: 100%;
  width: 55px;
  display: flex;
  align-items: center;
`;

const ImageItem = styled.img`
  display: block;
`;

const TextItem = styled.p`
  margin: 0;
  width: 180px;
  color: #424242;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
`;

class LeftMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'task-request',
      notification: {
        taskRequest: 0,
        reporting: 0,
        accounts: 0
      }
    };
    this.activeMenuByUrl = this.activeMenuByUrl.bind(this);
    this.activeMenuOnClick = this.activeMenuOnClick.bind(this);
  }

  componentDidMount() {
    this.activeMenuByUrl();
    this.getTotalTaskRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      notification: {
        taskRequest: nextProps.totalTaskRequest,
        reporting: 0,
        accounts: 0
      }
    });
  }

  getTotalTaskRequest() {
    const { dispatch } = this.props;
    return AuthenticatedRequest(this.props.user.access_token)
      .get(API_TOTAL_TASK_NEW)
      .then(response => {
        dispatch(NotificationAction.totalTaskRequest(response.data.data));
      });
  }

  activeMenuByUrl() {
    const url = window.location.pathname;
    const arrayUrl = url.split('/');

    if (arrayUrl[1] === '') {
      this.setState({
        name: 'clients'
      });
    } else {
      this.setState({
        name: arrayUrl[1]
      });
    }
  }

  activeMenuOnClick(event) {
    this.setState({
      name: event.currentTarget.name
    });
  }

  render() {
    const menuItem = [
      // {
      //   name: 'task-request',
      //   label: 'Task Request',
      //   image: TaskRequestPNG,
      //   notification: this.state.notification.taskRequest
      // },
      {
        name: 'clients',
        label: 'Client List',
        image: ClientListPNG,
        notification: this.state.notification.taskRequest
      }
      // {
      //   name: 'reporting',
      //   label: 'Reporting',
      //   image: ReportingPNG,
      //   notification: this.state.notification.reporting
      // },
      // {
      //   name: 'accounts',
      //   label: 'Account',
      //   image: AccountPNG,
      //   notification: this.state.notification.accounts
      // }
    ];

    return (
      <Main>
        <Content>
          <NavMenu className="firstImage">
            {menuItem.map((item) => (
              <Link
                to={`/${item.name}`}
                onClick={this.activeMenuOnClick}
                name={item.name}
                style={{ textDecoration: 'none' }}
                key={item.name.toString()}
              >
                <Item
                  ActiveColor={`${this.state.name}` === item.name ? '#F5F5F5' : 'white'}
                  ActiveBorder={`${this.state.name}` === item.name ? '#28C6BB' : 'white'}
                  key={item.name.toString()}
                >
                  <ImageFrame>
                    <ImageItem alt={item.name} src={item.image} />
                  </ImageFrame>
                  <TextItem>{item.label}</TextItem>
                  {
                    item.name === 'clients' &&
                    item.notification > 0 &&
                    <NotificationBadge number={item.notification} />
                  }
                </Item>
              </Link>
            ))}
          </NavMenu>
        </Content>
      </Main>
    );
  }
}

function mapStateToProps(state) {
  const { totalTaskRequest } = state.notificationReducer;
  const { user } = state.authenticationReducer;
  return {
    totalTaskRequest,
    user
  };
}

export default connect(mapStateToProps)(LeftMenu);
