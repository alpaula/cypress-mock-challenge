// Libs
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';

// Components
import Card from '../components/Card';
import Loading from '../components/Loading';

// Styles
const Container = styled.div`
  width: 100%;
  padding: 3rem 0;
`;

const Content = styled.div`
  position: relative;
`;

const Title = styled.h2`
  margin: 0;
  margin-left: 3rem;
  font: 800 2rem 'Josefin Sans', sans-serif;
  color: #fff;

  @media (max-width: 480px) {
    margin-left: 1rem;
  }
`;

const MoreButton = styled.button`
  position: absolute;
  top: .75rem;
  right: 2rem;
  border: none;
  background-color: transparent;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: #fff;
  outline: none;
  cursor: pointer;

  :hover {
    color: var(--ceci-dark);
    text-decoration: underline;
  }
`;

const ListBox = styled.div`
  display: flex;
  padding: 1rem 3rem;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 1rem .5rem;
  }
`;

const dict = {
  en: {
    'movies-title': 'Movies',
    'series-title': 'Series',
    'view-more': 'view more'
  },
  'pt-BR': {
    'movies-title': 'Filmes',
    'series-title': 'Séries',
    'view-more': 'ver mais'
  },
};

const Home = observer(({
  contentStore,
  history
}) => {
  const language = navigator.language === 'pt-BR' ? navigator.language : 'en';

  I18n.setLanguage(language);
  I18n.putVocabularies(dict);

  const moviesList = contentStore.getMoviesPreview();
  const seriesList = contentStore.getSeriesPreview();
  const isLoading = contentStore.isLoading;

  useEffect(() => {
    if (!moviesList.length && !seriesList.length) {
      contentStore.setLoading();
      setTimeout(() => {
        contentStore.savePreview();
      }, 1500);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderMovies = () => (
    <Content>
      <Title>{I18n.get('movies-title')}</Title>
      <MoreButton onClick={() => history.push('/movies/')}>
        {I18n.get('view-more')}
      </MoreButton>
      <ListBox>
        {moviesList.map(movie => (
          <Card
            key={movie.id}
            contentStore={contentStore}
            item={movie}
          />
        ))}
      </ListBox>
    </Content>
  );

  const renderSeries = () => (
    <Content>
      <Title>{I18n.get('series-title')}</Title>
      <MoreButton onClick={() => history.push('/series/')}>
        {I18n.get('view-more')}
      </MoreButton>
      <ListBox>
        {seriesList.map(serie => (
          <Card
            key={serie.id}
            contentStore={contentStore}
            item={serie}
          />
        ))}
      </ListBox>
    </Content>
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
      {renderMovies()}
      {renderSeries()}
    </Container>
  );
});

export default Home;