import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import UserItem from './UserItem';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_CLIENT_LIST, API_TASK_REQUEST } from '../../../../constants/common';
import { TIME_BANK, PLAN_FREE, NOTIFICATION } from '../../../../constants/subscription';
import {
  Search,
  List,
  Text,
  InputSearch,
  IconLoading,
  Header,
  IconSearch,
  CustomSelect,
  LabelSelect,
  ListItem
} from '../../../../styles/components/client/list';

const colourStyles = {
  control(styles) {
    return {
      ...styles,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
      borderRadius: '26px !important',
      border: '1px solid #F0F0F0',
      paddingLeft: '70px',
      '&:hover': {
        border: '1px solid #F0F0F0 important'
      }
    };
  },
  input(styles) {
    return {
      ...styles,
      paddingLeft: '70px !important',
      color: 'transparent'
    };
  },
  indicatorSeparator(state) {
    return {
      ...state,
      display: 'none'
    };
  },
  option(styles, { isSelected }) {
    return {
      ...styles,
      backgroundColor: '#FFFFFF',
      color: isSelected ? '#28C6BB' : 'default',
      textAlign: 'center'
    };
  }
};

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_recent: [],
      user_list: [],
      task_request:[],
      default: true,
      isTask: true,
      isUser: false,
      search: false,
      autoLoad: true,
      url: '',
      loading: false,
      showTaskRequest: 0,
      params: {
        key_search: ''
      },
      FilterValue: 1,
      listener: this.loadMore.bind(this)
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchDataUser = this.fetchDataUser.bind(this);
    this.myRef = React.createRef();
    this.handleInputSelect = this.handleInputSelect.bind(this);
  }

  componentWillMount() {
    this.fetchDataTask(API_TASK_REQUEST);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.listener);
  }

  componentDidUpdate() {
    let clientHeight = 0;

    if (this.myRef.current !== null) {
      clientHeight = this.myRef.current.clientHeight;
    }

    if (clientHeight < (window.innerHeight - 200) && this.state.url && !this.state.loading && !this.state.search) {
      if (this.state.showTaskRequest === 0) {
        this.fetchDataTask(this.state.url);
      }
    }

    if (this.state.isUser && !this.state.isTask && this.state.autoLoad && !this.state.loading) {
      this.fetchDataUser(API_CLIENT_LIST);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.listener);
  }

  loadMore() {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !this.state.loading
      && (this.state.url != null)) {
      if (this.state.isUser) {
        this.fetchDataUser(this.state.url);
      } else if (this.state.isTask) {
        this.fetchDataTask(this.state.url);
      }
    }

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      && !this.state.loading
      && !this.state.url
      && this.state.isUser) {
      this.fetchDataUser(API_CLIENT_LIST);
    }
  }

  handleInputSelect(event) {
    if (event.value !== this.state.showTaskRequest) {
      if (event.value === 1) {
        this.setState({
          ...this.state,
          task_request: [],
          url: '',
          user_list: [],
          isUser: true,
          isTask: false,
          search: false,
          showTaskRequest: event.value
        });
        this.fetchDataUser(API_CLIENT_LIST);
      } else {
        this.setState({
          user_list: [],
          user_recent: [],
          url: '',
          task_request: [],
          isUser: false,
          isTask: true,
          search: false,
          showTaskRequest: event.value,
          autoLoad: true
        });
        this.fetchDataTask(API_TASK_REQUEST);
      }
    }
  }

  renderItemUser(data) {
    let keySort = '';
    const temp = [];
    data.forEach((value) => {
      if (!this.state.search && value.tasks.length === 0) {
        const char = value.lastname.charAt(0);
        if (keySort === '') {
          keySort = char;
          temp.push(<Text key={Math.random()}>{keySort}</Text>);
        }

        if (char === keySort) {
          temp.push(
            <UserItem
              key={Math.random()}
              id={value.user_id}
              fullName={value.full_name}
              avatar={value.avatar}
              timeBank={value.subscription ? value.subscription.time_bank : TIME_BANK}
              planText={value.subscription ? value.subscription.plan_text : PLAN_FREE}
            />
          );
        } else {
          keySort = char;
          temp.push(<Text key={Math.random()}>{keySort}</Text>);
          temp.push(
            <UserItem
              id={value.user_id}
              key={Math.random()}
              fullName={value.full_name}
              avatar={value.avatar}
              timeBank={value.subscription ? value.subscription.time_bank : TIME_BANK}
              planText={value.subscription ? value.subscription.plan_text : PLAN_FREE}
            />
          );
        }
      } else if (this.state.search) {
        const char = value.lastname.charAt(0);
        if (keySort === '') {
          keySort = char;
          temp.push(<Text key={Math.random()}>{keySort}</Text>);
        }

        if (char === keySort) {
          temp.push(
            <UserItem
              key={Math.random()}
              id={value.user_id}
              notify={value.tasks_count ? value.tasks_count : NOTIFICATION}
              fullName={value.full_name}
              avatar={value.avatar}
              timeBank={value.subscription ? value.subscription.time_bank : TIME_BANK}
              planText={value.subscription ? value.subscription.plan_text : PLAN_FREE}
            />
          );
        } else {
          keySort = char;
          temp.push(<Text key={Math.random()}>{keySort}</Text>);
          temp.push(
            <UserItem
              id={value.user_id}
              key={Math.random()}
              notify={value.tasks_count ? value.tasks_count : NOTIFICATION}
              fullName={value.full_name}
              avatar={value.avatar}
              timeBank={value.subscription ? value.subscription.time_bank : TIME_BANK}
              planText={value.subscription ? value.subscription.plan_text : PLAN_FREE}
            />
          );
        }
      }
    });

    return temp;
  }

  renderItemTaksRequest(data) {
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

  fetchDataUser(URL, params) {
    this.setState({ loading: true });
    AuthenticatedRequest(this.props.user.access_token)
      .get(URL, params)
      .then(response => {
        this.setState({
          ...this.state,
          user_recent: response.data.data.user_recent,
          user_list: this.state.user_list.concat(response.data.data.user.data),
          url: response.data.data.user.next_page_url,
          isUser: !response.data.data.user.next_page_url ? false : this.state.isUser,
          loading: false,
          autoLoad: false
        });
      });
  }

  fetchDataTask(URL) {
    this.setState({ loading: true });
    AuthenticatedRequest(this.props.user.access_token)
      .get(URL)
      .then(response => {
        this.setState({
          ...this.state,
          task_request: this.state.task_request.concat(response.data.data.data),
          url: response.data.data.next_page_url,
          isTask: !response.data.data.next_page_url ? false : this.state.isTask,
          isUser: !response.data.data.next_page_url ? true : this.state.isUser,
          loading: false,
          autoLoad: true
        });
      });
  }

  renderItemUserRecent(data) {
    return data.map((value) => {
      if (value.user_recent) {
        return (<UserItem
          id={value.user_recent.id}
          key={Math.random()}
          fullName={value.user_recent.profile.full_name}
          avatar={value.user_recent.profile.avatar}
          timeBank={value.user_recent.subscription ? value.user_recent.subscription.time_bank : TIME_BANK}
          planText={value.user_recent.subscription ? value.user_recent.subscription.plan_text : PLAN_FREE}
        />);
      }
      return true;
    });
  }

  handleInputChange(event) {
    this.setState({
      params: {
        key_search: event.target.value
      },
      user_recent: [],
      task_request: [],
      user_list: [],
      isUser: event.target.value ? true : this.state.isUser,
      url: event.target.value ? this.state.url : '',
      search: !event.target.value ? false : this.state.default
    });

    if (!event.target.value) {
      this.fetchDataTask(API_TASK_REQUEST);
    } else {
      this.fetchDataUser(API_CLIENT_LIST, this.state.params);
    }
  }

  render() {
    const options = [
      { value: 0, label: 'Alphabetical' },
      { value: 1, label: 'Recently Visited' }
    ];

    return (
      <div ref={this.myRef}>
        <ListItem border={'true'}>
          <Header>
            <Search>
              <IconSearch className="fa fa-search" aria-hidden="true" />
              <InputSearch
                debounceTimeout={300}
                placeholder="Search Client"
                onChange={this.handleInputChange}
              />
            </Search>
            <Search>
              <LabelSelect>Filter by</LabelSelect>
              <CustomSelect
                defaultValue={{ label: 'Alphabetical', value: 0 }}
                options={options}
                placeholder={false}
                onChange={this.handleInputSelect}
                styles={colourStyles}
              />
            </Search>
          </Header>
          {!this.state.search ? 
            <List>
              <Text>{this.state.showTaskRequest === 1 && !this.state.search ? 'RECENT' : 'CLIENTS WITH NEW REQUESTS'}</Text>
              {this.state.showTaskRequest === 1 && !this.state.search ? this.renderItemUserRecent(this.state.user_recent) : this.renderItemTaksRequest(this.state.task_request)}
            </List>
            : null
          }
        </ListItem>
        <ListItem>
          <List>
            {this.renderItemUser(this.state.user_list)}
          </List>
        </ListItem>
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

export default connect(mapStateToProps)(ClientList);
