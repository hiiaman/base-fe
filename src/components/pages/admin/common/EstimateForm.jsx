import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import PopUp from '../common/PopUpNotification';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_TASK_UPDATE_ESTIMATED_TIME, API_USER_DETAIL } from '../../../../constants/common';
import {
  TimeForm,
  Input,
  Unit,
  Button,
  Row,
  Column,
  BoldText,
  NormalText,
  Due
} from '../../../../styles/components/task-detail';
import { STATUS_DOING, STATUS_NEW } from '../../../../constants/task';
import asyncComponent from '../../../asyncComponent';
import CheckDueTime from '../common/CheckDueTime';

const TimeInput = styled(Input)`
  margin-top: ${props => props.top || '0'};
`;

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

class EstimateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
      showInfo: '',
      disabledButton: false,
      estimatedTime: '',
      timeBank: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkEstimatedTime = this.checkEstimatedTime.bind(this);
    this.fetchTimeBank = this.fetchTimeBank.bind(this);
  }

  componentDidMount() {
    this.fetchTimeBank();
  }

  fetchTimeBank() {
    AuthenticatedRequest(this.props.user.access_token).get(`${API_USER_DETAIL}/${this.props.clientId}`)
      .then(
        response => {
          if (response.data.data.subscription) {
            this.setState({
              timeBank: response.data.data.subscription.time_bank
            });
          }
        }
      );
  }

  handleInputChange(event) {
    this.setState({
      estimatedTime : event.target.value
    });
  }

  handleSubmit() {
    const params = {
      estimated_time: this.state.estimatedTime,
      status: STATUS_DOING
    };
    this.setState({
      error: ''
    });
    AuthenticatedRequest(this.props.user.access_token)
      .put(`${API_TASK_UPDATE_ESTIMATED_TIME}/${this.props.taskId}`, params)
      .then(
        response => {
          this.props.handleAfterSuccess(response.data.time_bank);
          this.setState({
            showInfo: true,
            disabledButton: true
          });
        }
      )
      .catch(
        error => {
          this.setState({
            error: error.response.data.description[0]
          });
        }
      );
  }

  checkEstimatedTime(estimatedTime, dueTime, timeBank) {
    const timeCompare = moment.duration({ from: moment(), to: dueTime });
    let disabled = false;
    if (parseInt(estimatedTime, 10) > timeBank) {
      disabled = true;
      return (
        <Button
          onClick={this.handleSubmit}
          disabled={disabled}
          type="button"
          className="btn"
        >
          DO THIS TASK
        </Button>
      );
    }

    if (parseInt(estimatedTime, 10) > timeCompare.asMinutes()) {
      return (
        <PopUp
          button={<Button type="button" disabled={this.state.disabledButton} className="btn">DO THIS TASK</Button>}
          header="Are you sure?"
          content="The time you have just estimated is over the due time."
          submit={this.handleSubmit}
        />
      );
    }

    return <Button onClick={this.handleSubmit} type="button" className="btn">DO THIS TASK</Button>;
  }

  render() {
    const { error, showInfo, estimatedTime, timeBank } = this.state;
    const { oldEstimatedTime, dueDate, top, isModal } = this.props;

    return (
      <TimeForm top={top}>
        {showInfo &&
          <AlertError
            type="alert-info"
            message="You have just estimated successfully."
            timeDuration={4000}
          />
        }
        {error &&
          <AlertError
            message={error}
            timeDuration={0}
          />
        }
        {isModal &&
          <Row>
            <Column className="col-lg-3" >
              <NormalText size="14px">Due Date</NormalText>
            </Column>
            <Column className="col-lg-5">
              <BoldText size="16px">
                {dueDate}
              </BoldText>
            </Column>
            <Column className="col-lg-4">
              <Due>
                <CheckDueTime
                  time={dueDate}
                  status={STATUS_NEW}
                />
              </Due>
            </Column>
          </Row>
        }
        <TimeInput
          onChange={this.handleInputChange}
          type="text"
          name="estimated_time"
          placeholder="Estimated Completion Time"
          defaultValue={oldEstimatedTime}
          top={isModal && '15px'}
        />
        <Unit>mins/ {timeBank} mins remaining</Unit>
        {this.checkEstimatedTime(estimatedTime, dueDate, timeBank)}
      </TimeForm>
    );
  }
}

export default EstimateForm;
