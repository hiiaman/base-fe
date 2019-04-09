import React from 'react';
import styled from 'styled-components';
import { FadeLoader } from 'react-spinners';

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
`;

const IconLoading = () => (
  <Frame>
    <FadeLoader
      sizeUnit={'px'}
      size={50}
      color={'rgb(54, 215, 183)'}
    />
  </Frame>
);

export default IconLoading;
