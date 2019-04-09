import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import UserItem from '../client/UserItem';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_TASK_REQUEST } from '../../../../constants/common';
import { TIME_BANK, NOTIFICATION, PLAN_FREE } from '../../../../constants/subscription';
import {
  List,
  IconLoading
} from '../../../../styles/components/client/list';

class TaskRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list: [],
      url: '',
      loading: false,
      params: {
        key_search: '',
        page: 1
      },
      listener: this.loadMore.bind(this)
    };
  }

  componentWillMount() {
    this.fetchData(API_TASK_REQUEST);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.listener);
  }

  loadMore() {
    if (window.scrollHeight === window.clientHeight
      && !this.state.loading
      && (this.state.url != null)) {
      this.fetchData(this.state.url);
    }
  }

  renderItemUser(data) {
    return data.map((value) =>
      (<UserItem
        id={value.user_id}
        key={value.id}
        notify={value.tasks_count ? value.tasks_count : NOTIFICATION}
        fullName={value.full_name}
        avatar={value.avatar}
        timeBank={value.subscription ? value.subscription.time_bank : TIME_BANK}
        planText={value.subscription ? value.subscription.plan_text : PLAN_FREE}
      />)
    );
  }

  fetchData(URL, params) {
    this.setState({ loading: true });
    AuthenticatedRequest(this.props.user.access_token)
      .get(URL, params)
      .then(response => {
        this.setState({
          user_list: this.state.user_list.concat(response.data.data.data),
          url: response.data.data.next_page_url,
          loading: false
        });
      });
  }

  render() {
    return (
      <div>
        <List>
          {this.renderItemUser(this.state.user_list)}
        </List>
        <IconLoading>
          <FadeLoader
            sizeUnit={'px'}
            size={50}
            color={'rgb(54, 215, 183)'}
            loading={this.state.loading}
          />
        </IconLoading>
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

export default connect(mapStateToProps)(TaskRequestList);
