import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CameraPNG from '../../../../../public/images/camera@3x.png';
import ImgCsv from '../../../../../public/images/IconCsv@2x.png';
import { AuthenticatedRequest } from '../../../../services/api';
import { EXPORT_CSV_TIME_USE } from '../../../../constants/common';


const AvatarContent = styled.div`
  margin-bottom: 40px;
  padding-left: 0;
`;

const AvatarImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${props => props.url || ''});
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CameraContent = styled.div`
  position: absolute;
  background-color: #FFFFFF;
  width: 30%;
  height: 30%;
  bottom: -15%;
  right: 35%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CameraImage = styled.img`
  width: 60%;
  display: block;
`;

const Label = styled.p`
  color: #9E9E9E;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
`;

const Text = styled.p`
  color: #212121;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  margin-bottom: 15px;
`;

const ExportCsv = styled.div`
  margin-top: 100px;
`;

const CsvLink = styled.a`
    color: #28C6BB;
    text-decoration: none;
    cursor: pointer;
    margin-left: 5px;
`;

const CsvIcons = styled.img`
  width: 26px;
  height:
`;

const InformationContent = styled.div`
  padding-left: 30px;
  @media (max-width: 992px) {
    padding-left: 0;
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      avatar: ''
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getTimeUsedCsv = this.getTimeUsedCsv.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const { user } = this.props.user;
    const profile = user.profile;

    this.setState({
      fullname: profile.full_name,
      email: user.email,
      avatar: profile.avatar
    });
  }

  getTimeUsedCsv() {
    AuthenticatedRequest(this.props.user.access_token)
      .get(EXPORT_CSV_TIME_USE)
      .then(
        response => {
          const link = document.createElement('a');
          link.href = response.data.data;
          document.body.appendChild(link);
          link.click();
        }
      );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <AvatarContent className="col-lg-2">
            <AvatarImage url={this.state.avatar}>
              <CameraContent>
                <CameraImage src={CameraPNG} alt="camera" />
              </CameraContent>
            </AvatarImage>
          </AvatarContent>
          <InformationContent className="col-lg-10">
            <Label>NAME</Label>
            <Text>{this.state.fullname}</Text>
            <Label>EMAIL</Label>
            <Text>{this.state.email}</Text>
            <Label>PASSWORD</Label>
            <div className="row">
              <Text className="col-md-6 col-sm-12">••••••••</Text>
            </div>
          </InformationContent>
          <ExportCsv className="col-lg-12">
            <CsvIcons src={ImgCsv} alt="IconsCsv" />
            <CsvLink 
              onClick={this.getTimeUsedCsv}
            >
              Export assistance time usage report for this month
            </CsvLink>
          </ExportCsv>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authenticationReducer;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
