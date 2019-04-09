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
  ShowTime
} from '../../../../styles/components/task-detail';
import CheckDueTime from '../common/CheckDueTime';

export default function Letter({ task }) {
  return (
    <TaskInfo className="col-md-offset-1 col-md-11">
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Recipient’s Name</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.name_category}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Recipient’s Address</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.address}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Letter’s Type</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.letter_type}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Number of Letters</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.letter_number}</BoldText>
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
          <NormalText size="14px">Main points</NormalText>
        </Column>
        <Column className="col-md-8">
          <BoldText size="16px">{task.letter_content}</BoldText>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Handwritting Style</NormalText>
        </Column>
        <Column className="col-md-8">
          <div>
            {task.image_letter_style.map((item) => (
              <ImageItem key={Math.random()} className="col-md-6">
                <Image src={item} alt="img" />
              </ImageItem>
            ))}
          </div>
        </Column>
      </Row>
      <Row className="col-md-12">
        <Column className="col-md-4">
          <NormalText size="14px">Card Type</NormalText>
        </Column>
        <Column className="col-md-8">
          <div>
            {task.image_letter_card_type.map((item) => (
              <ImageItem key={Math.random()} className="col-md-6">
                <Image src={item} alt="img" />
              </ImageItem>
            ))}
          </div>
        </Column>
      </Row>
    </TaskInfo>
  );
}

