import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/dashboard.css';
import { PrivateRoute } from './PrivateRoute';
import { history } from './../redux/store/configureStore';
import { alertActions } from '../redux/actions/alert';
import asyncComponent from './asyncComponent';

const Header = asyncComponent(() =>
  import('./pages/admin/common/Header').then(module => module.default)
);
const LeftMenu = asyncComponent(() =>
  import('./pages/admin/common/LeftMenu').then(module => module.default)
);
const Login = asyncComponent(() =>
  import('./pages/Login').then(module => module.Login)
);
const Logout = asyncComponent(() =>
  import('./pages/Logout').then(module => module.Logout)
);
const ClientIndex = asyncComponent(() =>
  import('./pages/admin/client/index').then(module => module.default)
);
const ReportingList = asyncComponent(() =>
  import('./pages/admin/reporting/index').then(module => module.default)
);
// const Register = asyncComponent(() =>
//   import('./pages/Register').then(module => module.Register)
// );
const AccountList = asyncComponent(() =>
  import('./pages/admin/account/index').then(module => module.default)
);
// const TaskRequest = asyncComponent(() =>
//   import('./pages/admin/task-request/index').then(module => module.default)
// );

const TaskDetail = asyncComponent(() =>
  import('./pages/admin/task/detail').then(module => module.TaskDetail)
);

const Page404 = asyncComponent(() =>
  import('./pages/admin/common/Page404').then(module => module.default)
);

const ClientList = asyncComponent(() =>
  import('./pages/admin/client/list').then(module => module.default)
);

const ConnentMain = styled.div`
  // padding-top: 40px;
  min-height: calc( 100vh - 60px);
  height: 100%;
  margin: auto;
  width: 100%;
  // margin-bottom: 90px;
  background-color: #FFFFFF;
  margin-left: 1px;
  position: relative
`;

const Container = styled.div`
  width: 100%;
  // padding: 0 40px;
`;

const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert &&
          alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
        <PrivateRoute>
          <Header />
          <Main>
            <LeftMenu />
            <ConnentMain>
              <Container>
                <Switch>
                  <Route exact path="/" component={ClientList} />
                  {/* <Route path="/task-request" component={TaskRequest} /> */}
                  <Route path="/clients" component={ClientIndex} />
                  <Route path="/reporting" component={ReportingList} />
                  <Route path="/accounts" component={AccountList} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/tasks/:taskId" component={TaskDetail} />
                  <Route path="/404" component={Page404} />
                  <Route path="*" component={Page404} />
                </Switch>
              </Container>
            </ConnentMain>
          </Main>
        </PrivateRoute>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
