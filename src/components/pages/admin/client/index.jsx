import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../../asyncComponent';

const ClientList = asyncComponent(() =>
  import('./list').then(module => module.default)
);

const ClientDetail = asyncComponent(() =>
  import('./detail').then(module => module.ClientDetail)
);

const TaskDetail = asyncComponent(() =>
  import('../task/detail').then(module => module.TaskDetail)
);

const ClientIndex = () => (
  <div>
    <Switch>
      <Route exact path="/clients" component={ClientList} />
      <Route exact path="/clients/:id" component={ClientDetail} />
      <Route path="/clients/:id/task/:taskId" component={TaskDetail} />
    </Switch>
  </div>
);

export default ClientIndex;
