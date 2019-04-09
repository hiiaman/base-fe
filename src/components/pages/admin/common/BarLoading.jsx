import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  width: 100%;
  display: block;
  margin: auto;
`;

const Loading = styled.div`
  width: 15%;
  height: 3px;
  background: linear-gradient(to right,  #28C6BB 0%,#f6f6f6 100%);
  position :relative;
  -webkit-animation: mymove 2s infinite;
  animation: mymove 2s infinite;
  border-radius: 10px 10px 0 0; 

  @-webkit-keyframes mymove {
    from {left: 0px;}
    to {left: 85%;}
  }

  @keyframes mymove {
    from {left: 0px;}
    to {left: 85%;}
  }
`;

const BarLoading = () => (
  <Frame>
    <Loading />
  </Frame>
);

export default BarLoading;
