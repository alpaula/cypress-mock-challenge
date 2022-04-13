// Libs
import React from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

// Styles
const Container = styled.button`
  position: relative;
  min-width: 17vw;
  width: 17vw;
  height: 26vw;
  margin: .75rem;
  border: none;
  border-radius: .75rem;
  background: url(${props => props.background}) no-repeat center var(--ceci-light-second-transparent);
  background-size: cover;
  cursor: pointer;
  outline: none;
  filter: opacity(.85);
  overflow: hidden;
  
  :hover {
    box-shadow: 0 0 20px var(--ceci-dark);

    > div {
      display: block;
    }
  }

  @media (max-width: 480px) {
    min-width: calc(50vw - 2.75rem);
    width: calc(50vw - 2.75rem);
    height: 60vw;
  }
`;

const BoxTexts = styled.div`
  position: absolute;
  bottom: 0;
  display: none;
  width: 100%;
  padding: .5rem 1rem;
  background-color: #ffffffcc;
  backdrop-filter: blur(2px);

  @media (max-width: 480px) {
    padding: .5rem;
  }
`;

const Title = styled.h3`
  font: 600 1.25rem 'Josefin Sans', sans-serif;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  width: 100%;
  max-height: 15rem;
  font: 100 1rem 'Josefin Sans', sans-serif;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    max-height: 5rem;
    font-size: .75rem;
  }
`;

const Card = ({ item }) => {
  const history = useHistory();

  const handleSelectedItem = () => {
    history.push(`/${item.type}/${item.id}/`);
  }

  return (
    <Container
      background={item.posterImage}
      onClick={handleSelectedItem}
    >
      <BoxTexts>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </BoxTexts>
    </Container>
  );
};

export default Card;