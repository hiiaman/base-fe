import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F44337;
  border-radius: 100%;
  width: 20px;
  height: 20px;
`;

const Number = styled.p`
  margin: 0;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  text-align: center;
`;

const NotificationBadge = props => (
  <Background>
    <Number>
      {props.number}
    </Number>
  </Background>
);

export default NotificationBadge;
