import React from 'react';
import { connect } from 'react-redux';
import IconLoading from '../common/IconLoading';
import { loadingActions } from '../../../../redux/actions/loading';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_TASK_DETAIL } from '../../../../constants/common';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import {
  STATUS_DONE,
  STATUS_NEW,
  TASK_DETAIL_LOCALPRO,
  TASK_DETAIL_LOCAL_PLACE,
  TASK_DETAIL_DINNER,
  TASK_DETAIL_LETTER
} from '../../../../constants/task';
import Dinner from './Dinner';
import Letter from './Letter';
import LocalPlace from './LocalPlace';
import LocalPro from './LocalPro';
import FindMeaLocal from '../../../../../public/images/FindMeaLocal.png';
import FindMePlace from '../../../../../public/images/FindMePlace.png';
import WhatForDinner from '../../../../../public/images/WhatForDinner.png';
import WriteMeLetter from '../../../../../public/images/WriteMeLetter.png';
import {
  Row,
  Column,
  BoldText,
  NormalText,
  Task,
  Icon,
  TaskContent,
  TaskTitle,
  Bottom,
  RowIcon,
  CategoryName,
  Content,
  RowNoteForm,
  Alert
} from '../../../../styles/components/task-detail';
import AssistantCard from '../common/AssistantCard';
import AddTimeBankForm from '../common/AddTimeBankForm';
import asyncComponent from '../../../asyncComponent';

const NoteForm = asyncComponent(() =>
  import('../common/NoteForm').then(module => module.default)
);

const EstimateForm = asyncComponent(() =>
  import('../common/EstimateForm').then(module => module.default)
);

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      estimatedTime: '',
      error: '',
      categoryId: '',
      showInfo: false,
      taskId: this.props.match.params.taskId,
      clientId: this.props.match.params.id,
      currentTimebank: 0,
      showTimeBankForm: false
    };
    this.fetchTask = this.fetchTask.bind(this);
    this.handleAfterSuccess = this.handleAfterSuccess.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleShowTimeBankForm = this.handleShowTimeBankForm.bind(this);
    this.handleAfterAddTime = this.handleAfterAddTime.bind(this);
    this.handleAfterNoteForm = this.handleAfterNoteForm.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(loadingActions.setStatus(true));
    this.fetchTask(user.access_token);
  }

  fetchTask(token) {
    AuthenticatedRequest(token).get(`${API_TASK_DETAIL}/${this.state.taskId}`)
      .then(
        response => {
          this.setState({
            task: response.data.data,
            categoryId: response.data.data.parent_id ? response.data.data.parent_id : response.data.data.category_id
          });
          const { dispatch } = this.props;
          dispatch(loadingActions.setStatus(false));
        }
      );
  }

  renderTaskInFo() {
    switch (this.state.categoryId) {
      case TASK_DETAIL_LOCALPRO:
        return <LocalPro task={this.state.task} />;
      case TASK_DETAIL_LOCAL_PLACE:
        return <LocalPlace task={this.state.task} />;
      case TASK_DETAIL_DINNER:
        return <Dinner task={this.state.task} />;
      case TASK_DETAIL_LETTER:
        return <Letter task={this.state.task} />;
      default:
        return '';
    }
  }

  renderIcons() {
    switch (this.state.categoryId) {
      case TASK_DETAIL_LOCALPRO:
        return <Icon src={FindMeaLocal} alt={FindMeaLocal} />;
      case TASK_DETAIL_LOCAL_PLACE:
        return <Icon src={FindMePlace} alt={FindMePlace} />;
      case TASK_DETAIL_DINNER:
        return <Icon src={WhatForDinner} alt={WhatForDinner} />;
      case TASK_DETAIL_LETTER:
        return <Icon src={WriteMeLetter} alt={WriteMeLetter} />;
      default:
        return '';
    }
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

  handleAfterNoteForm() {
    this.fetchTask(this.props.user.access_token);
  }

  renderContent() {
    const { taskId, clientId, task, currentTimebank, showTimeBankForm, addTimeSuccess } = this.state;
    const { user } = this.props;
    return (
      <Content id="task">
        {!showTimeBankForm ? (
          <div>
            {addTimeSuccess && (
              <Alert>
                <AlertError
                  type="alert-info"
                  message="Successfully added more time."
                  timeDuration={4000}
                />
              </Alert>
            )}
            <AssistantCard
              user={user}
              id={clientId}
              currentTimebank={currentTimebank}
              showTimeBankForm={this.handleShowTimeBankForm}
            />
            <Task>
              <div className="col-md-12">
                <div className="col-md-12">
                  <RowIcon className="col-md-1 p-0 text-center">
                    {this.renderIcons()}
                  </RowIcon>
                  <CategoryName className="col-md-11">
                    <TaskTitle>{task.title}</TaskTitle>
                  </CategoryName>
                </div>
                <TaskContent className="col-md-12 aaa">
                  {this.renderTaskInFo()}
                  <div className="col-md-12 text-center">
                    {task.status === STATUS_NEW ?
                      <EstimateForm
                        user={user}
                        taskId={taskId}
                        oldEstimatedTime={task.estimated_time}
                        dueDate={task.due_date}
                        handleAfterSuccess={this.handleAfterSuccess}
                        clientId={clientId}
                      />
                      :
                      <Bottom>
                        <Row className="col-md-offset-1 col-md-11">
                          <Column className="col-md-4 text-left">
                            <NormalText size="16px">Estimated Time</NormalText>
                          </Column>
                          <Column className="col-md-8">
                            <BoldText size="16px">{task.estimated_time} minutes</BoldText>
                          </Column>
                        </Row>
                        <Row className="col-md-offset-1 col-md-11">
                          <RowNoteForm className="col-md-12">
                            {task.status === STATUS_DONE &&
                              <NoteForm
                                id={taskId}
                                user={user}
                                status={task.status}
                                handleAfterSuccess={this.handleAfterNoteForm}
                              />
                            }
                          </RowNoteForm>
                        </Row>
                      </Bottom>
                    }
                  </div>
                </TaskContent>
              </div>
            </Task>
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
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        {
          loading ?
            <IconLoading /> :
            this.renderContent()
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

const connectedApp = connect(mapStateToProps)(TaskDetail);

export { connectedApp as TaskDetail };
