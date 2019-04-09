import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Button } from '../../../../styles/components/task-detail';

const contentStyle = {
  maxWidth: '600px',
  width: '550px',
  height: 'auto',
  top: '-90px'
};

const Header = styled.div`
  width: 100%;
  height: 40px;
  font-size: 18px;
  text-align: left;
  padding: 20px 10px;
  line-height: 30px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 10px 20px 10px;
`;

const Footer = styled.div`
  margin: auto;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 5px;
  text-align: center;
`;

const BoldText = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 400;
  line-height: 22px;
  margin: 0;
`;

const CloseIcon = styled.span`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
`;

const ModalButton = styled(Button)`
  display: block;
`;

const Modal = styled.div`
  margin: 2px 20px 10px 20px;
`;

const PopUpForm = ({ open, header, content, handleSubmit, submitMessage, functionClose }) => (
  <Popup
    open={open}
    position="top center"
    contentStyle={contentStyle}
    onClose={functionClose}
  >
    {close => (
      <Modal>
        <CloseIcon onClick={close}>&times;</CloseIcon>
        {header ? <Header><BoldText>{header}</BoldText></Header> : ''}
        <Content>
          {content}
        </Content>
        {submitMessage ? 
          <Footer>
            <ModalButton
              bottom="40px"
              type="button"
              onClick={handleSubmit}
            >
              {submitMessage}
            </ModalButton>
          </Footer>
          : ''
        }
      </Modal>
    )}
  </Popup>
);

export default PopUpForm;
