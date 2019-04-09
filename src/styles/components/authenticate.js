import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

export const Logo = styled.img`
  margin: 0 auto;
  display: block;
  margin-top: 50px;
  margin-bottom: 36px;
`;

export const Form = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  width: 500px;
  margin: auto;
  height: auto;
`;

export const Header = styled.h1`
  color: #212121;
  font-family: Roboto;
  font-size: 34px;
  font-weight: 500;
  line-height: 41px;
  text-align: center;
  margin: 0 auto;
`;

export const SocialHeader = styled(Header)`
  color: #616161;
  font-size: 14px;
  font-weight: 400;
`;

export const Submit = styled.button`
  display: block;
  margin: 30px auto;
  background-color: #28C6BB;
  border-radius: 28px;
  width: 100%;
  height: 54px;
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  width: 100%;
  text-align: center;
  border-color: transparent;

  :focus {
    outline:0px !important;
    -webkit-appearance:none;
  }
`;

export const InputTable = styled.table`
  width: 100%;
  text-align: center;
  margin-top: 26px;
  border-collapse: unset;
  border-spacing: 0;
  border: none;

  tr {
    height: 47px;
  }

  td {
    width: 50%;
    border: 1px solid ${props => props.AuthBorder || '#BDBDBD'};
    overflow: auto;
  }

  tr:last-child td:first-child {
    border-radius: 0 0 10px 10px;
  }
`;

export const LoginInputs = styled(InputTable)`
  tr:first-child td:first-child {
    border-radius: 10px 10px 0 0;
    border-bottom: none;
  }
`;

export const RegisterInputs = styled(InputTable)`
  tr:first-child td:first-child {
    border-bottom: none;
    border-right: none;
    border-radius: 10px 0 0 0;
  }

  tr:first-child td:last-child {
    border-bottom: none;
    border-radius: 0 10px 0  0;
  }

  tr:nth-child(2) td:first-child,
  tr:nth-child(3) td:first-child {
    border-bottom: none;
  }
`;

export const Input = styled.input`
  padding: 1em;
  width: 100%;
  border: none;
  line-height: normal;
  font-size: 16px;

  ::placeholder {
    color: #BDBDBD;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 2px;
    line-height: 19px;
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

export const Text = styled.p`
  color: #9E9E9E;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
`;

export const LeftText = styled(Text)`
  text-align: left;
`;

export const CenterText = styled(Text)`
  text-align: center;
`;

export const SocialLogin = styled.div`
  width: 100%;
  margin: 45px 0 20px 0;
  text-align: center;
`;


export const Button = styled.a`
  border-radius: 27px;
  width: 160px;
  height: 54px;
  color: #3E67B4;
  vertical-align: middle;
  background: none;
  padding: 17px;
  margin-right: 10px;

  :active,
  :focus,
  :hover {
    background-color: transparent !important;
    color: currentColor !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
`;

export const FacebookButton = styled(Button)`
  border: 1px solid #3E67B4;
  color: #3E67B4;
`;

export const GoogleButton = styled(Button)`
  border: 1px solid #BD5050;
  color: #BD5050;
`;

export const Bottom = styled.p`
  color: #9E9E9E;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-bottom: 36px;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  width: 420px;
`;

export const StyledLink = styled(Link)`
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

export const FormHeader = styled.div`
  padding-top: 33px;
`;

export const FormContent = styled.div`
  padding: 0 40px 33px 40px;
`;

export const Icon = styled.i`
  font-size: 17px !important;
  margin-right: 5px !important;
`;
