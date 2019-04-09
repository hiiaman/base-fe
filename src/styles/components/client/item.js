import styled from 'styled-components';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

export const Item = styled.div`
  width: 20em;
  height: 60px;
  display: inline-block;
  text-align: left;
  position: relative
  margin-bottom: 35px;
  margin-right: 50px;
`;

export const ImageItem = styled.div`
  width: 60px;
  height: 60px;
  display: inline-block;
  position: relative;
`;

export const TextItem = styled.div`
  position: absolute;
  margin-left: 5%;
  width: 65%;
  height: 60px;
  display: inline-block;
  padding-top: 8px;
`;

export const TextName = styled.p`
  color: #212121;
  width: 100%;
  font-family: Roboto;
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  margin: 0;
`;

export const Text = styled.p`
  display: inline-block;
  color: #757575;
  font-family: Roboto;
  font-size: 16x;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  width: 80px;
`;

export const TextValue = styled.p`
  display: inline-block;
  padding-left: 5px;
  color: #212121;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
`;

export const Image = styled.img`
  text-align: left;
  width: 100%;
  height: 100%;
  background-size: 100%;
  border-radius: 100%;
`;

export const ItemNotify = styled.i`
  background-color: #F44337;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  left: 70%;
  font-style: normal;
`;
