import React from 'react';
import moment from 'moment';
import { STATUS_DONE, STATUS_NEW } from '../../../../constants/task';
import {
  DueTime
} from '../../../../styles/components/task-detail';

const CheckDueTime = props => {
  const timeCompare = moment.duration({ from: moment(), to: props.time });
  const taskDays = timeCompare.days();
  let text = '';
  let color = '';
  const status = (props.status) ? props.status : STATUS_NEW;
  if (status !== STATUS_DONE) {
    if (taskDays > 3) {
      text = `${taskDays} Days Until Due`;
      color = '#4CAF51';
    }

    if (taskDays >= 1 && taskDays <= 3) {
      text = `${taskDays} Days Until Due`;
      color = '#F9A825';
    }

    if (taskDays < 1) {
      text = `${timeCompare.hours()} Hours Until Due`;
      color = '#F9A825';
    }

    if (timeCompare.hours() <= 0) {
      text = 'OverDue';
      color = '';
    }

    return (
      <DueTime Color={color} Padding={props.padding}>{text}</DueTime>
    );
  }

  return null;
};

export default CheckDueTime;
