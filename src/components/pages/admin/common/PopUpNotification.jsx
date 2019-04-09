import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
  padding: 0,
  top: '-150px'
};

const Button = styled.button`
  font-family: "Roboto";
  color: #ffffff;
  border-color: transparent;
  cursor: pointer;
  padding: 0px 30px;
  display: inline-block;
  margin: 10px 15px;
  text-transform: uppercase;
  line-height: 2em;
  vertical-align: middle;
  letter-spacing: 1.5px;
  font-size: 1em;
  outline: none;
  position: relative;
  font-size: 14px;
  background-color: #28C6BB;
  border-radius: 15px 15px 15px 15px;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  background-color: #EDF5F7;
  font-size: 18px;
  text-align: center;
  padding: 10px;
  line-height: 30px;
`;

const Content = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 20px 5px;
`;

const Footer = styled.div`
  margin: auto;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 5px;
  text-align: center;
`;

const NormalText = styled.p`
  color: #757575;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  text-align: center;
`;

const BoldText = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 550;
  text-align: center;
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

const Modal = styled.div`
`;

const PopUp = ({ button, header, content, submit }) => (
  <Popup
    trigger={button}
    modal
    position="top center"
    contentStyle={contentStyle}
  >
    {close => (
      <Modal>
        <CloseIcon onClick={close}>&times;</CloseIcon>
        <Header><BoldText>{header}</BoldText></Header>
        <Content>
          <NormalText>{content}</NormalText>
        </Content>
        <Footer>
          <Button onClick={close}>Cancel</Button>
          <Button
            type="button"
            onClick={() => {
              close();
              submit();
            }}
          >
            Confirm
          </Button>
        </Footer>
      </Modal>
    )}
  </Popup>
);

export default PopUp;
