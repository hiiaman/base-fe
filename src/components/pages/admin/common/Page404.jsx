import React from 'react';
import styled from 'styled-components';

const BackGround = styled.div`
  background-color: #F6F8F9;
  padding: 40px 0 40px 0;
  min-height: calc( 100vh - 60px);
  height: 100%;
  text-align: center;
  color: #28C6BB;
`;

const Page404 = () => (
  <BackGround>
    <h3>Sorry, we couldn't find that page.</h3>
  </BackGround>
);

export default Page404;
