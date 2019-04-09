import React from 'react';
import styled from 'styled-components';
import { AuthenticatedRequest } from '../../../../services/api';
import { API_USER_DETAIL } from '../../../../constants/common';
import AddTimeIcon from '../../../../../public/images/AddTime@2x.png';

const NormalText = styled.p`
  color: #757575;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 400;
  line-height: 22px;
  margin: 0;
`;

const BoldText = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 400;
  text-align: left;
  line-height: 22px;
  margin: 0;
`;

const Image = styled.img`
  width: 24px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Column = styled.div`
  width: ${props => (props.width ? props.width : 'auto')};
  margin-right: 15px;
`;
const AssistantFrame = styled.div`
  text-align: center;
`;

const Assistant = styled.div`
  display: inline-flex;
  background-color: #FFFFFF;
  border-radius: 58px;
  height: 94px;
  margin: auto;
  padding: 12px;
`;


const Avatar = styled.img`
  display: inline-table;
  background-size: 100%;
  border-radius: 100%;
  width: 70px;
  height: 70px;
`;

const AssistantInfo = styled.div`
  display: inline-table;
  margin-left: 12px;
  margin-right: 24px;
  text-align: justify;
  margin-top: 10px;
`;

const AssistantName = styled(BoldText)`
  font-weight: 500;
  line-height: 29px;
  margin: 0;
  font-size: 24px;
`;

class AssistantCard extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      subscription: {
        time_bank: 0,
        plan_text: 'Free'
      },
      showAddTimeModal: false
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.handleAddTimeClick = this.handleAddTimeClick.bind(this);
  }

  componentDidMount() {
    this.fetchUser(this.props.user);
  }

  fetchUser(user) {
    AuthenticatedRequest(user.access_token).get(`${API_USER_DETAIL}/${this.props.id}`)
      .then(
        response => {
          this.setState({
            profile: response.data.data.profile
          });

          if (response.data.data.subscription) {
            this.setState({
              subscription: response.data.data.subscription
            });
          }
        }
      );
  }

  handleAddTimeClick() {
    this.props.showTimeBankForm(this.state.profile.full_name);
  }

  render() {
    const { profile, subscription } = this.state;
    const { currentTimebank } = this.props;

    return (
      <AssistantFrame>
        <Assistant>
          <Avatar src={profile.avatar} alt="avatar" />
          <AssistantInfo>
            <AssistantName>{profile.full_name}</AssistantName>
            <Row>
              <Column>
                <NormalText>Time Bank</NormalText>
              </Column>
              <Column>
                <BoldText>
                  {currentTimebank || subscription.time_bank} minutes
                </BoldText>
              </Column>
              <Column>
                <Image
                  src={AddTimeIcon}
                  alt="attach"
                  onClick={this.handleAddTimeClick}
                />
              </Column>
            </Row>
            {/* <Row>
              <Column width="190px" >
                <NormalText>Subscription</NormalText>
              </Column>
              <Column>
                <BoldText>{subscription.plan_text}</BoldText>
              </Column>
            </Row> */}
          </AssistantInfo>
        </Assistant>
      </AssistantFrame>
    );
  }
}

export default AssistantCard;
