import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  Input
} from '../../../../styles/components/task-detail';
import asyncComponent from '../../../asyncComponent';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_ADD_TIME_BANK } from '../../../../constants/common';

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

const FormFrame = styled.div`
  height: 300px;
  background-color: #FFFFFF;
  padding: 45px 50px;
`;

const Text = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
`;

const Header = styled.div`
`;

const Form = styled.form`
  text-align: center;
  margin-bottom: 100px;
`;

const Submit = styled(Button)`
  width: 100px;
  display: inline-block;
  margin-left: 15px;
`;

class AddTimeBankForm extends Component {
  constructor() {
    super();
    this.state = {
      timeBank: 0,
      error: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      timeBank : event.target.value
    });
  }

  handleSubmit(event) {
    const params = {
      time: this.state.timeBank
    };
    if (!params.time) {
      this.setState({
        error: 'The time field is required'
      });
    } else {
      AuthenticatedRequest(this.props.user.access_token)
        .put(`${API_ADD_TIME_BANK}/${this.props.id}`, params)
        .then(
          response => {
            this.props.handleAfterAddTime();
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
  }

  render() {
    const { error } = this.state;

    return (
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <FormFrame>
            <Header>
              <Text>Add more time into Time Bank for {this.props.clientName}</Text>
            </Header>
            <Form>
              {error &&
                <AlertError
                  message={error}
                  timeDuration={0}
                />
              }
              <Input
                onChange={this.handleInputChange}
                type="text"
                name="time_bank"
                placeholder="Input amount of time (minutes)"
              />
              <Submit onClick={this.handleSubmit} type="button" bottom="35px">ADD</Submit>
            </Form>
          </FormFrame>
        </div>
      </div>      
    );
  }
}

export default AddTimeBankForm;
