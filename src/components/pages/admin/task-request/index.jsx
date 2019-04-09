import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../../asyncComponent';

const TaskRequestList = asyncComponent(() =>
  import('./list').then(module => module.default)
);

const ClientDetail = asyncComponent(() =>
  import('../client/detail').then(module => module.ClientDetail)
);

class TaskRequestIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.match.path
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={this.state.path} component={TaskRequestList} />
          <Route path={`${this.state.path}/:id`} component={ClientDetail} />
        </Switch>
      </div>
    );
  }
}

export default TaskRequestIndex;
