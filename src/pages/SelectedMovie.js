// Libs
import React, { useEffect } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { I18n } from "@aws-amplify/core";

// Images
import freeIcon from '../assets/free.png'

// Components
import Loading from "../components/Loading";

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 5%;
  background-color: #000;
`;

const ImagesBox = styled.div`
  position: relative;
  width: 30%;
`;

const PosterImage = styled.img`
  width: 100%;
`;

const Content = styled.div`
  width: 60%;
  margin-left: 3%;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font: 600 2rem 'Josefin Sans', sans-serif;
  color: var(--ceci-light-second);
`;

const Label = styled.label`
  margin-right: 1rem;
  font: 600 .9rem 'Josefin Sans', sans-serif;
  color: var(--ceci-light-transparent);
`;

const SubTitle = styled.p`
  margin: 0;
  font: 100 1rem 'Josefin Sans', sans-serif;
  line-height: 1.375rem;
  color: var(--ceci-light-second);
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  margin: .25rem 0;
`;

const Hours = styled.p`
  margin: 0;
  margin-right: .5rem;
  color: var(--ceci-light-second);
  font: 100 1rem 'Josefin Sans', sans-serif;
`;

const FreeClassification = styled.img`
  width: 1rem;
  margin-bottom: .175rem;
`;

const Description = styled.p`
  width: 70%;
  max-height: 15rem;
  font: 100 1rem 'Josefin Sans', sans-serif;
  line-height: 1.375rem;
  color: var(--ceci-light-second);
`;

const dict = {
  en: {
    'original-title': 'Original title:',
    'genres-item': 'Genres:',
    'direction-item': 'Direction:',
    'actors-item': 'Starring:',
  },
  'pt-BR': {
    'original-title': 'Título original:',
    'genres-item': 'Gêneros:',
    'direction-item': 'Direção:',
    'actors-item': 'Estrelando:',
  },
};

const SelectedMovie = observer(({
  contentStore
}) => {
  const language = navigator.language === 'pt-BR' ? navigator.language : 'en';
  I18n.setLanguage(language);
  I18n.putVocabularies(dict);

  const history = useHistory();
  const selectedId = history.location.pathname.split('/')[2];

  const movie = toJS(contentStore.selectedMovie);
  const isLoading = contentStore.isLoading;

  useEffect(() => {
    contentStore.setLoading();
    setTimeout(() => {
      contentStore.saveSelectedMovie(selectedId);
    }, 1500);

    return () => contentStore.cleanSelectedMovie();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const convertMinToHour = (min) => {
    const minutes = min % 60;
    const hours = Math.floor(min / 60);

    return `${hours} h ${minutes} min`;
  }

  if (isLoading) return <Loading />;

  return (
    <Container>
      <ImagesBox>
        <PosterImage src={movie.poster} />
      </ImagesBox>
      <Content>
        <Title>{movie.title}</Title>
        <Box>
          <Hours>{convertMinToHour(movie.runtime)}</Hours>
          <Hours>{movie.releaseDate.split('-')[0]}</Hours>
          {!movie.adult && <FreeClassification src={freeIcon} />}
        </Box>
        <Box>
          <Label>{I18n.get('original-title')}</Label>
          <SubTitle>{movie.originalTitle}</SubTitle>
        </Box>
        <Box>
          <Label>{I18n.get('genres-item')}</Label>
          <SubTitle>{movie.genres}</SubTitle>
        </Box>
        <Box>
          <Label>{I18n.get('direction-item')}</Label>
          <SubTitle>{movie.direction}</SubTitle>
        </Box>
        <Box>
          <Label>{I18n.get('actors-item')}</Label>
          <SubTitle>{movie.actors}</SubTitle>
        </Box>
        <Description>{movie.description}</Description>
      </Content>
    </Container>
  );
});

export default SelectedMovie;