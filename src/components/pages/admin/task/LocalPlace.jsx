import React from 'react';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import {
  Row,
  Column,
  BoldText,
  NormalText,
  TaskInfo,
  Due,
  ShowTime
} from '../../../../styles/components/task-detail';
import CheckDueTime from '../common/CheckDueTime';


export default function LocalPlace({ task }) {
  return (
    <TaskInfo className="col-md-offset-1 col-md-11">
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Place</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.name_category}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Task Description</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.description}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">What’s Important</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.important}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Due Date</NormalText>
        </Column>
        <Column className="col-md-8">
          <ShowTime className="col-lg-6">
            <BoldText size="16px">
              {task.due_date}
            </BoldText>
          </ShowTime>
          <Due className="col-lg-4">
            <CheckDueTime
              time={task.due_date}
              status={task.status}
            />
          </Due>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Note</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.note}</BoldText>
        </Column>
      </Row>
    </TaskInfo>
  );
}

