// Libs
import React from "react";
import styled from 'styled-components';

// Images
import loadingIcon from '../assets/loading.gif';

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  filter: drop-shadow(-17px 56px 11px #00000055);
`;

const Loading = () => (
  <Container>
    <Icon src={loadingIcon} />
  </Container>
);

export default Loading;