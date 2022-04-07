// Libs
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';

// Axios
import { trendingClient } from '../dataflow/axios/axios';
import Card from '../components/Card';

// Styles
const Container = styled.div`
  width: 100%;
  padding: 3rem 0;
  background-color: var(--ceci-medium-second);
`;

const Content = styled.div`
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 0;
  margin-left: 3rem;
  font: 800 2rem 'Josefin Sans', sans-serif;
  color: #fff;
`;

const MoreButton = styled.a`
  position: absolute;
  top: .75rem;
  right: 2rem;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: #fff;
  text-decoration: none;
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
  contentStore
}) => {
  const language = navigator.language === 'pt-BR' ? navigator.language : 'en';

  I18n.setLanguage(language);
  I18n.putVocabularies(dict);

  const moviesList = contentStore.getMovies();
  const seriesList = contentStore.getSeries();

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
          popularity: movie.popularity
        }));

      const series = response.data.results
        .filter(movie => movie.media_type === 'tv')
        .map(movie => ({
          id: movie.id,
          title: movie.name,
          description: movie.overview,
          score: movie.vote_average,
          posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
          adult: true,
          popularity: movie.popularity
        }));

      contentStore.saveMovies(movies);
      contentStore.saveSeries(series);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const renderMovies = () => (
    <Content>
      <Title>{I18n.get('movies-title')}</Title>
      <MoreButton href='/movies/'>
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
      <MoreButton href='/series/'>
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