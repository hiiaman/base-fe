import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import Select from 'react-select';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

export const Container = styled.div`
  
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
export const List = styled.div`
  width: 100%;
  height: auto;
`;
export const Text = styled.p`
  color: #9E9E9E;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 30px;
`;
export const InputSearch = styled(DebounceInput)`
  background-color: #FFFFFF;
  border: none;
  border-radius: 20px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.15);
  width: 330px;
  height: 40px;
  line-height: normal;
  padding-left: 3em;

  ::placeholder {
    color: #757575;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    width: 181px;
    text-align: left;
  }

  :hover,
  :active,
  :focus {
    outline: 0px !important;
    -webkit-appearance:none;
  }

  :-webkit-autofill,
  :-webkit-autofill: hover,
  :-webkit-autofill: focus,
  :-webkit-autofill: active {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`;

export const IconLoading = styled.div`
  margin-left: 50%;
  margin-top: 3%;
`;

export const Search = styled.div`
  position: relative;
  margin-right: 20px;
`;

export const IconSearch = styled.i`
  color: #28C6BB;
  left: 20px;
  position: absolute;
  z-index: 1;
  top: 12px;
`;

export const CustomSelect = styled(Select)`
  width: 253px;
`;

export const LabelSelect = styled.label`
  color: #28C6BB;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 15px;
`;

export const ListItem = styled.div`
  padding: 0 40px;
  border-bottom: ${props => (props.border ? '4px solid #F5F5F5' : 'none')};
`;
