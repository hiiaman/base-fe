import React, { Component } from 'react';
import styled from 'styled-components';
import Attach from '../../../../../public/images/Attach.png';
import File from '../../../../../public/images/File.png';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_TASK_UPDATE_RESULT } from '../../../../constants/common';
import { STATUS_DONE } from '../../../../constants/task';
import {
  BoldText,
  NormalText,
  Button
} from '../../../../styles/components/task-detail';
import asyncComponent from '../../../asyncComponent';

const AlertError = asyncComponent(() =>
  import('../common/AlertError').then(module => module.default)
);

const Note = styled.div`
  margin-top: ${props => props.top || '40px'};
`;

const TextArea = styled.textarea`
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  //width: 490px;
  width: 100%;
  height: 163px;
  padding: 17px 0 0 22px;
  margin-top: 21px;
  margin-bottom: 16px;
  resize: none;

  ::placeholder {
    color: #9E9E9E;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
  }

  :hover,
  :active,
  :focus {
    outline:0px !important;
    -webkit-appearance:none;
  }

  :focus::-webkit-input-placeholder { color:transparent; }
  :focus:-moz-placeholder { color:transparent; }
  :focus::-moz-placeholder { color:transparent; }
  :focus:-ms-input-placeholder { color:transparent; }
`;

const Image = styled.img`
  margin-right: 8px;
`;

const AttachedFile = styled.div`
  overflow: visible;
  position: relative;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  height: 40px;
  padding: 11px 14px;
  margin-bottom: 22px;
  display: inline-flex;
`;

const CloseIcon = styled.button`
  background-color: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-radius: 100%;
  width: 18px;
  height: 18px;
  position: absolute;
  top: -7px;
  right: -7px;
  text-align: center;
  vertical-align: middle;
  padding: 0.25px 1px;
`;

const FileName = styled(NormalText)`
  display: inline-table;
`;

const Form = styled.form`
`;

const Input = styled.input`
  display: none !important;
`;

const AttachIcon = styled.a`
  cursor: pointer;
  color: #212121;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  margin-top: 23px;

  :focus,
  :active,
  :hover {
    color: black;
    text-decoration: none;
  }
`;

class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      fileName: '',
      note: '',
      error: '',
      file: null,
      disabledButton: false
    };
    this.fileUpload = React.createRef();
    this.showCloseIcon = this.showCloseIcon.bind(this);
    this.hideCloseIcon = this.hideCloseIcon.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickUpload = this.handleClickUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteUploadFile = this.deleteUploadFile.bind(this);
  }

  handleClickUpload() {
    this.fileUpload.current.click();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'file') {
      const uploadedFile = target.files[0];
      this.setState({
        file: uploadedFile,
        fileName: uploadedFile.name
      });
    } else {
      this.setState({
        note: target.value
      });
    }
  }

  handleSubmit() {
    const data = new FormData();
    this.setState({
      disabledButton: true
    });
    if (!this.state.note && !this.state.file) {
      this.setState({
        error: 'The note field or an attached file is required.',
        disabledButton: false
      });
    } else {
      data.append('note', this.state.note);
      if (this.state.file) {
        data.append('file', this.state.file);
      }
      data.append('status', STATUS_DONE);
      data.append('_method', 'PUT');

      this.setState({
        error: ''
      });
  
      AuthenticatedRequest(this.props.user.access_token)
        .post(`${API_TASK_UPDATE_RESULT}/${this.props.id}`, data)
        .then(
          response => {
            this.props.handleAfterSuccess();
            this.setState({
              disabledButton: false
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
  }

  showCloseIcon() {
    this.setState({
      hover: true
    });
  }

  hideCloseIcon() {
    this.setState({
      hover: false
    });
  }

  deleteUploadFile() {
    this.setState({
      fileName: '',
      file: ''
    });
    this.fileUpload.current.value = '';
  }

  render() {
    const { hover, fileName, error } = this.state;
    const { top } = this.props;

    return (
      <Note top={top}>
        <BoldText size="18px">
          Leave a Note for Client
        </BoldText>
        <Form>
          {error &&
            <AlertError
              message={error}
              timeDuration={0}
            />
          }
          <TextArea name="note" onChange={this.handleInputChange} placeholder="Say something" />
          {fileName &&
            <AttachedFile
              onMouseEnter={this.showCloseIcon}
              onMouseLeave={this.hideCloseIcon}
            >
              {hover && <CloseIcon onClick={this.deleteUploadFile}>&times;</CloseIcon>}
              <FileName size="14px"><Image src={File} alt="attach" /> {fileName}</FileName>
            </AttachedFile>
          }
          <NormalText onClick={this.handleClickUpload} size="14px">
            <AttachIcon>
              <Image src={Attach} alt="attach" />
              Attach a Pdf file
            </AttachIcon>
            <Input
              onChange={this.handleInputChange}
              name="file"
              ref={this.fileUpload}
              type="file"
              accept="application/pdf"
            />
          </NormalText>
          <Button onClick={this.handleSubmit} disabled={this.state.disabledButton} type="button" bottom="40px">MARK DONE</Button>
        </Form>
      </Note>
    );
  }
}

export default NoteForm;
