// Libs
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';

// Axios
import { trendingClient } from '../dataflow/axios/axios';

// Components
import Card from '../components/Card';

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

  const getMovies = async () => {
    try {
      const response = await trendingClient({
        method: 'get',
        url: `&language=${language}`
      });

      const movies = response.data.results
        .filter(movie => movie.media_type === 'movie')
        .map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          score: movie.vote_average,
          posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
          adult: movie.adult,
          popularity: movie.popularity,
          backdropImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.backdrop_path}`
        }));

      const series = response.data.results
        .filter(serie => serie.media_type === 'tv')
        .map(serie => ({
          id: serie.id,
          title: serie.name,
          description: serie.overview,
          score: serie.vote_average,
          posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.poster_path}`,
          adult: false,
          popularity: serie.popularity,
          backdropImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.backdrop_path}`
        }));

      contentStore.saveMoviesPreview(movies);
      contentStore.saveSeriesPreview(series);
    } catch (error) { console.log('error: ', error) }
  }

  useEffect(() => {
    if (!moviesList.length && !seriesList.length) {
      getMovies();
    }
  }, []);

  const renderMovies = () => (
    <Content>
      <Title>{I18n.get('movies-title')}</Title>
      <MoreButton onClick={() => history.push('/movies/')}>
        {I18n.get('view-more')}
      </MoreButton>
      <ListBox>
        {moviesList.map(movie => <Card key={movie.id} item={movie} />)}
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
        {seriesList.map(movie => <Card key={movie.id} item={movie} />)}
      </ListBox>
    </Content>
  );

  return (
    <Container>
      {renderMovies()}
      {renderSeries()}
    </Container>
  );
});

export default Home;