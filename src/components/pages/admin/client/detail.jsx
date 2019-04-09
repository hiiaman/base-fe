import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';
import { DebounceInput } from 'react-debounce-input';
import { loadingActions } from '../../../../redux/actions/loading';
import IconLoading from '../../admin/common/IconLoading';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import { AuthenticatedRequest } from '../../../../services/api';
import { NotificationAction } from '../../../../redux/actions/notification';
import { API_TASK_LIST, API_TASK_UPDATE_STATUS, API_CLIENT_LIST, API_TOTAL_TASK_NEW } from '../../../../constants/common';
import {
  STATUS_NEW,
  STATUS_DOING,
  STATUS_DONE,
  TASK_DETAIL_LOCALPRO,
  TASK_DETAIL_LOCAL_PLACE,
  TASK_DETAIL_DINNER,
  TASK_DETAIL_LETTER
} from '../../../../constants/task';
import asyncComponent from '../../../asyncComponent';
import AddTimeBankForm from '../common/AddTimeBankForm';

const AssistantCard = asyncComponent(() =>
  import('../../admin/common/AssistantCard').then(module => module.default)
);

const CheckDueTime = asyncComponent(() =>
  import('../common/CheckDueTime').then(module => module.default)
);

const PopUp = asyncComponent(() =>
  import('../common/PopUpForm').then(module => module.default)
);

const NoteForm = asyncComponent(() =>
  import('../common/NoteForm').then(module => module.default)
);

const EstimateForm = asyncComponent(() =>
  import('../common/EstimateForm').then(module => module.default)
);

const Pagination = asyncComponent(() =>
  import('../common/Pagination').then(module => module.Pagination)
);

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border: 1px;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 1px 1px #E0E0E0;
`;

const TableHeader = styled.thead`
  tr:first-child th:first-child {
    width: 40px;
  }
  tr:first-child th:nth-child(4) {
    width: 300px;
  }
  tr:first-child th:nth-child(5) {
    width: 15%;
  }
`;

const TableBody = styled.tbody`
`;

const TableTr = styled.tr`
  background: #FFFFFF;
`;

const TableTh = styled.th`
  vertical-align: bottom;
  color: #FFFFFF;
  background-color: #28C6BB;
  padding: 8px;
  line-height: 1.42857143;
`;

const TableTrBody = styled(TableTr)`
  background: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
`;

const customStyles = {
  control(state, props) {
    return {
      ...state,
      minHeight: 20,
      border: 'none',
      '&:hover': {
        border: '1px solid #F0F0F0 important'
      },
      '&:focus': {
        border: '1px solid #F0F0F0 important'
      },
      backgroundColor: props.selectProps.value.color
    };
  },
  dropdownIndicator(state) {
    return {
      ...state,
      padding: 4,
      color: '#FFFFFF'
    };
  },
  clearIndicator(state) {
    return {
      ...state,
      padding: 4,
      color: '#FFFFFF'
    };
  },
  multiValue(state) {
    return {
      ...state,
      color: '#FFFFFF'
    };
  },
  valueContainer(state) {
    return {
      ...state,
      padding: '0px 6px'
    };
  },
  input(state) {
    return {
      ...state,
      margin: 0,
      color: 'transparent',
      padding: 0
    };
  },
  singleValue(state) {
    return {
      ...state,
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 500
    };
  },
  indicatorSeparator(state) {
    return {
      ...state,
      display: 'none'
    };
  },
  option(styles, { isDisabled }) {
    return {
      ...styles,
      backgroundColor: '#28C6BB',
      color: isDisabled ? '#90DBD6' : '#FFFFFF',
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '17px',
      '&:hover': {
        backgroundColor: isDisabled ? '#28C6BB' : '#17BCB1'
      }
    };
  },
  menu(styles) {
    return {
      ...styles,
      backgroundColor: '#28C6BB',
      zIndex: 9999,
      width: '120px !important',
      right: 0,
      top: '22px'
    };
  }
};

const TableTd = styled.td`
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
`;

const TableSelect = styled.td`
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  position: absolute;
`;

const CheckIcons = styled.i`
  position: absolute;
  right: 10px;
`;

const InputSearch = styled(DebounceInput)`
  float: right;
  margin-bottom: 10px;
  width: 238px;
  height: 36px;
  border: 1px solid #BDBDBD;
  border-radius: 3px;
  padding: 10px;
`;

const Title = styled(Link)`
  color: #212121;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  :focus,
  :active,
  :hover {
    color: #212121;
    text-decoration: none;
  }
`;

const LabelTime = styled.div`
  background-color: ${props => props.Color || '#FF5252'};
  border: 1px solid ${props => props.Color || '#FF5252'};
  width: 100px;
  border-radius: 50px;
  text-align: center;
  height: 17px;
  vertical-align: middle;
`;


const TextTime = styled.p`
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
`;

const SeclectStatus = styled(Select)`
  width: 100px;
  height: 10px;
  `;

const Content = styled.div`
  padding: 0 40px 0 40px;
  position: absolute;
  background-color: #F6F8F9;
  height: 100%;
  width: 100%;
  padding-top: 40px;
`;

class ClientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      totalRecords: 1,
      url: '',
      totalPages: 1,
      currentPage: 1,
      params: {
        user_id: this.props.match.params.id,
        key_search: ''
      },
      formRecord: 0,
      toRecord: 1,
      isActive: 1,
      showPopup: false,
      clientId: this.props.match.params.id,
      estimateModal: false,
      currentTimebank: 0,
      showTimeBankForm: false
    };

    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.handleAfterSuccess = this.handleAfterSuccess.bind(this);
    this.handleShowTimeBankForm = this.handleShowTimeBankForm.bind(this);
    this.handleAfterAddTime = this.handleAfterAddTime.bind(this);
    this.optionDisabled = this.optionDisabled.bind(this);
  }

  componentWillMount() {
    const url = window.location.pathname;
    const arrayUrl = url.split('/');
    if (isNaN(arrayUrl[2])) {
      this.props.history.replace('/404');
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadingActions.setStatus(true));
    this.fetchData(this.state.params);
    this.saveUserRecent();
  }

  saveUserRecent() {
    return AuthenticatedRequest(this.props.user.access_token)
      .post(API_CLIENT_LIST, { user_recent_id: this.state.params.user_id });
  }

  handleInputSearch(event) {
    this.setState({
      params: {
        ...this.state.params,
        key_search: event.target.value
      }
    });

    this.fetchData(this.state.params);
  }

  onChangeStatus(e, id, oldEstimatedTime, dueDate) {
    const value = e.value;
    const { user } = this.props;
    const params = {
      status: value
    };
    if (parseInt(value, 10) === STATUS_DONE) {
      this.setState({
        currentTask: id,
        showPopup: !this.state.showPopup
      });
    } else if (parseInt(value, 10) === STATUS_DOING && !oldEstimatedTime) {
      this.setState({
        currentTask: id,
        estimateModal: !this.state.estimateModal,
        due: dueDate
      });
    } else {
      AuthenticatedRequest(user.access_token)
        .put(`${API_TASK_UPDATE_STATUS}/${id}`, params)
        .then(result => {
          this.fetchData(this.state.params);
        });
    }
  }

  fetchData(paramsSearch) {
    this.updateTotalTaskRequest();
    const { user, dispatch } = this.props;
    AuthenticatedRequest(user.access_token)
      .get(`${API_TASK_LIST}?page=${this.state.currentPage}`, paramsSearch)
      .then(result => {
        this.setState({
          tasks: result.data.data.data,
          totalRecords: result.data.data.total,
          url: result.data.data.path,
          totalPages: result.data.data.last_page,
          currentPage: result.data.data.current_page,
          formRecord: result.data.data.from,
          toRecord: result.data.data.to
        });
        dispatch(loadingActions.setStatus(false));
      });
  }

  onPageChanged(data) {
    data.then(result => {
      this.setState({
        tasks: result.data.data,
        totalRecords: result.data.total,
        totalPages: result.data.last_page,
        currentPage: result.data.current_page,
        formRecord: result.data.from,
        toRecord: result.data.to
      });
    });
  }

  updateTotalTaskRequest() {
    const { dispatch } = this.props;
    AuthenticatedRequest(this.props.user.access_token)
      .get(API_TOTAL_TASK_NEW)
      .then(response => {
        dispatch(NotificationAction.totalTaskRequest(response.data.data));
      });
  }

  checkTimeDue(time, status) {
    const timeCompare = moment.duration({ from: moment(), to: time });
    const taskDays = timeCompare.days();
    let text = `Under ${timeCompare.hours() < 1 ? 1 : timeCompare.hours()} hour Until Due`;
    let color = '';
    if (status !== STATUS_DONE) {
      if (taskDays > 3) {
        text = `${taskDays} Days Until Due`;
        color = '#4CAF51';
      }

      if (taskDays >= 1 && taskDays <= 3) {
        text = `${taskDays} Days Until Due`;
        color = '#F9A825';
      }

      if (timeCompare.hours() <= 0) {
        text = 'OverDue';
      }

      return (
        <LabelTime Color={color}>
          <TextTime>{text}</TextTime>
        </LabelTime>
      );
    }

    return null;
  }

  handleShowTimeBankForm(client) {
    this.setState({
      showTimeBankForm: true,
      clientName: client
    });
  }

  handleAfterAddTime() {
    this.setState({
      showTimeBankForm: false,
      addTimeSuccess: true
    });
  }

  handleAfterSuccess(timeBank) {
    this.setState({
      currentTimebank: timeBank
    });
  }

  closeModal() {
    this.setState({
      showPopup: false,
      estimateModal: false
    });
    this.fetchData(this.state.params);
  }

  renderDescription(item) {
    const categoryIds = item.parent_id ? item.parent_id : item.category_id;
    switch (categoryIds) {
      case TASK_DETAIL_LOCALPRO:
        return <p>Professional: {item.description}</p>;
      case TASK_DETAIL_LOCAL_PLACE:
        return <p>Place: {item.name_category}</p>;
      case TASK_DETAIL_DINNER:
        return <p>Number of meals: {item.number_meals}</p>;
      case TASK_DETAIL_LETTER:
        return <p>Letter Type: {item.letter_type}</p>;
      default:
        return '';
    }
  }

  optionDisabled(option, item) {
    const status = parseInt(item[0].value, 10);
    if (status === STATUS_NEW) {
      return option.value === STATUS_DONE;
    } else if (status === STATUS_DOING) {
      return option.value === STATUS_NEW;
    }

    return false;
  }

  render() {
    const {
      clientId,
      tasks,
      totalRecords,
      totalPages,
      currentPage,
      url,
      params,
      formRecord,
      toRecord,
      showPopup,
      estimateModal,
      currentTask,
      currentTimebank,
      showTimeBankForm,
      addTimeSuccess
    } = this.state;
    const { user, loading } = this.props;

    const options = [
      { value: STATUS_NEW, label: 'New', color: '#28C6BB' },
      { value: STATUS_DOING, label: 'Doing', color: '#3971D7' },
      { value: STATUS_DONE, label: 'Done', color: '#A7E5E1' }
    ];

    const { Option } = components;
    const IconOption = (props) => (
      <Option {...props} >
        {props.data.label}
        {props.data.label === props.selectProps.value.label ? <CheckIcons className="fa fa-check" /> : ''}
      </Option>
    );

    return (
      <div>
        {
          loading ?
            <IconLoading /> :
            <Content>
              {!showTimeBankForm ? (
                <div>
                  <div className="col-md-12">
                    {addTimeSuccess && (
                      <AlertError
                        type="alert-info"
                        message="Successfully added more time."
                        timeDuration={4000}
                      />
                    )}
                    <AssistantCard
                      user={user}
                      id={clientId}
                      currentTimebank={currentTimebank}
                      showTimeBankForm={this.handleShowTimeBankForm}
                    />
                  </div>
                  <div className="col-md-12">
                    <InputSearch
                      name="keySearch"
                      value={this.state.key_search}
                      placeholder="Search Here"
                      onChange={this.handleInputSearch}
                      debounceTimeout={500}
                      element="input"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <Table>
                        <TableHeader>
                          <TableTr>
                            <TableTh>
                              {/* <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                              </div> */}
                            </TableTh>
                            <TableTh>Category</TableTh>
                            <TableTh>Description</TableTh>
                            <TableTh>Due Date</TableTh>
                            <TableTh>Status</TableTh>
                          </TableTr>
                        </TableHeader>
                        <TableBody>
                          {
                            tasks.map((item) => (
                              <TableTrBody key={item.id}>
                                <TableTd />
                                <TableTd>
                                  <Title
                                    to={{
                                      pathname: `/clients/${this.props.match.params.id}/task/${item.id}`
                                    }}
                                  >
                                    { item.name_category }
                                  </Title>
                                </TableTd>
                                <TableTd>
                                  {this.renderDescription(item)}
                                </TableTd>
                                <TableTd>
                                  { moment(item.due_date).format('MMM DD, YYYY') } | { moment(item.due_date).format('HH:mm') }
                                  <br />
                                  <CheckDueTime
                                    time={item.due_date}
                                    status={item.status}
                                    padding="2px"
                                  />
                                </TableTd>
                                <TableSelect>
                                  <SeclectStatus
                                    className={'sectionTest'}
                                    options={options}
                                    value={options[item.status - 1]}
                                    components={{ Option: IconOption }}
                                    placeholder={false}
                                    onChange={e =>
                                      this.onChangeStatus(
                                        e,
                                        item.id,
                                        item.estimated_time,
                                        item.due_date
                                      )
                                    }
                                    styles={customStyles}
                                    isOptionDisabled={(option, item) => this.optionDisabled(option, item)}
                                    isDisabled={item.status === STATUS_DONE}
                                  />
                                </TableSelect>
                              </TableTrBody>
                            ))
                          }
                        </TableBody>
                      </Table>
                      <Pagination
                        totalRecords={totalRecords}
                        pageNeighbours={2}
                        onPageChanged={this.onPageChanged}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        url={url}
                        params={params}
                        formRecord={formRecord}
                        toRecord={toRecord}
                      />
                    </div>
                  </div>
                  {showPopup &&
                    <PopUp
                      content={
                        <NoteForm
                          id={currentTask}
                          user={user}
                          handleAfterSuccess={this.closeModal}
                          top="20px"
                        />
                      }
                      open={showPopup}
                      functionClose={this.closeModal}
                    />
                  }
                  {estimateModal &&
                    <PopUp
                      header="Estimated Completion Time to Do This Task"
                      content={
                        <EstimateForm
                          user={user}
                          taskId={currentTask}
                          dueDate={this.state.due}
                          open={estimateModal}
                          clientId={clientId}
                          handleAfterSuccess={this.handleAfterSuccess}
                          top="0"
                          isModal={1}
                        />
                      }
                      open={estimateModal}
                      functionClose={this.closeModal}
                    />
                  }
                </div>
              ) : (
                <AddTimeBankForm
                  clientName={this.state.clientName}
                  handleAfterAddTime={this.handleAfterAddTime}
                  user={user}
                  id={clientId}
                />
              )}
            </Content>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authenticationReducer;
  const { loading } = state.loadingReducer;

  return {
    user,
    loading
  };
}

const connectedApp = connect(mapStateToProps)(ClientDetail);
export { connectedApp as ClientDetail };
