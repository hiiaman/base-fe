import styled from 'styled-components';

export const NormalText = styled.p`
  color: ${props => (props.color ? props.color : '#757575')};;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '18px')};
  font-weight: 400;
  line-height: 30px;
  margin: 0;
  padding: 0;
`;

export const Content = styled.div`
  background-color: #F6F8F9;
  padding: 40px 0 40px 0;
  min-height: calc( 100vh - 60px);
  height: 100%;
`;

export const BoldText = styled.p`
  color: #212121;
  font-family: Roboto;
  font-size: ${props => (props.size ? props.size : '16px')};
  font-weight: 400;
  text-align: left;
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  display: flex;
  padding: 0;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
`;

export const RowDescribe = styled.div`
  padding: 0;
  line-height: 35px;
`;

export const Task = styled.div`
  // width: 749px;
  width: 70%;
  height: auto;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  margin: auto;
  padding-top: 30px;
  margin-top: 33px;
  text-align: justify;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

export const TaskContent = styled.div`
  width: 100%;
  // padding: 0 40px 0 0;
`;

export const TaskTitle = styled(BoldText)`
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 3px !important;
  color: #212121;
  font-family: Roboto;
  font-weight: 500;
  padding-left: 15px;
`;

export const TaskDescription = styled(NormalText)`
  font-size: 16px;
  line-height: 26px;
  width: 516px;
  text-align: justify;
  margin-bottom: 12px !important;
`;

export const TaskInfo = styled.div`
  margin-bottom: 40px;
`;

export const Due = styled.div`
  padding: 0;
`;

export const DueTime = styled.span`
  background-color: ${props => props.Color || '#FF5252'};
  padding: ${props => props.Padding || '5px'} 15px;
  border-radius: 23px;
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  height: 14px;
`;

export const Bottom = styled.div`
  margin-bottom: 40px;
`;

export const TimeForm = styled.form`
  margin-top: ${props => props.top || '35px'};
  margin-bottom: 65px;
`;

export const Input = styled.input`
  border: 1px solid #BDBDBD;
  border-radius: 10px;
  width: 248px;
  height: 46px;
  padding-left: 20px;
  line-height: 19px;
  font-size: 16px;

  ::placeholder {
    color: #BDBDBD;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    width: 228px;
    text-align: left;
  }

  :hover,
  :active,
  :focus {
    outline:0px !important;
    -webkit-appearance:none;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }

  :focus::-webkit-input-placeholder { color:transparent; }
  :focus:-moz-placeholder { color:transparent; }
  :focus::-moz-placeholder { color:transparent; }
  :focus:-ms-input-placeholder { color:transparent; }
`;

export const Unit = styled.span`
  padding-left: 12px;
  color: #212121;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  width: 228px;
  text-align: left;
`;

export const Button = styled.button`
  display: block;
  margin: auto;
  margin-top: ${props => props.bottom || '65px'};
  border-color: transparent;
  background-color: #28C6BB;
  border-radius: 28px;
  width: 178px;
  height: 36px;
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  width: 178px;
  text-align: center;

  :hover,
  :active,
  :focus {
    color: #FFFFFF;
    outline:0px !important;
    -webkit-appearance:none;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    color: #FFFFFF;
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`;

export const ImageItem = styled.div`
  display: inline-block;
  // margin-left: 20px;
  padding: 15px 15px 0 0;
`;

export const Image = styled.img`
  width:100%;
  height:100%;
  border-radius: 14px;
`;

export const RowIcon = styled.div`
  padding: 0;
`;

export const CategoryName = styled.div`
  padding: 0;
`;

export const ShowTime = styled.div`
  padding: 0;
`;

export const RowNoteForm = styled.div`
  margin-bottom: 40px;
`;

export const Alert = styled.div`
  width: 70%;
  margin: auto;
`;
