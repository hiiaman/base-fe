import React from 'react';
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import {
  Row,
  Column,
  BoldText,
  NormalText,
  TaskInfo,
  Due,
  ImageItem,
  Image,
  ShowTime,
  RowDescribe
} from '../../../../styles/components/task-detail';
import CheckDueTime from '../common/CheckDueTime';

export default function Dinner({ task }) {
  return (
    <TaskInfo className="col-md-offset-1 col-md-11">
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Number of People</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.number_people}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Number of Meals</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.number_meals}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Dietary Requirements</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.dietary_requirements}</BoldText>
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
          <NormalText size="14px">Examples</NormalText>
        </Column>
        <Column className="col-md-8">
          <div>
            {task.image_examples.map((item) => (
              <ImageItem key={Math.random()} className="col-md-6">
                <Image src={item} alt="img" />
              </ImageItem>
            ))}
          </div>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Describe the People</NormalText>
        </Column>
        <RowDescribe className="col-md-8">
          <div>
            <div className="col-md-12">
              <NormalText size="16px" color="#28C6BB">Ages Rage:</NormalText>
            </div>
            <div className="col-md-12">
              <BoldText>{task.ages_rage}</BoldText>
            </div>
          </div>
          <div>
            <div className="col-md-12">
              <NormalText size="16px" color="#28C6BB">Allergies:</NormalText>
            </div>
            <div className="col-md-12">
              <BoldText>{task.Allergies}</BoldText>
            </div>
          </div>
          <div>
            <div className="col-md-12">
              <NormalText size="16px" color="#28C6BB">Likes:</NormalText>
            </div>
            <div className="col-md-12">
              <BoldText>{task.likes}</BoldText>
            </div>
          </div>
          <div>
            <div className="col-md-12">
              <NormalText size="16px" color="#28C6BB">Dislikes:</NormalText>
            </div>
            <div className="col-md-12">
              <BoldText>{task.dislikes}</BoldText>
            </div>
          </div>
        </RowDescribe>
      </Row>
    </TaskInfo>
  );
}

