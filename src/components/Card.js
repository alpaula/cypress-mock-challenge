// Libs
import React from "react";
import styled from 'styled-components';

// Styles
const Container = styled.div`
  position: relative;
  min-width: 19%;
  width: 19%;
  height: 22rem;
  margin-right: 1rem;
  border: 2px solid transparent;
  border-radius: .75rem;
  background: url(${props => props.background}) no-repeat center;
  background-size: cover;
  filter: opacity(.85);
  overflow: hidden;
  
  :hover {
    box-shadow: 0 0 15px #00000033;
    border-color: var(--ceci-text);

    > div {
      display: block;
    }
  }
`;

const BoxTexts = styled.div`
  position: absolute;
  bottom: 0;
  display: none;
  padding: .5rem 1rem;
  background-color: #ffffffcc;
  backdrop-filter: blur(2px);
`;

const Title = styled.h3`
  font: 600 1.25rem 'Josefin Sans', sans-serif;
`;

const Description = styled.p`
  width: 100%;
  max-height: 15rem;
  font: 100 1rem 'Josefin Sans', sans-serif;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Card = ({ item }) => {
  return (
    <Container
      background={item.posterImage}
    >
      <BoxTexts>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </BoxTexts>
    </Container>
  );
};

export default Card;