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

const Content = styled.div``;

const Title = styled.h2`
  margin-left: 3rem;
  font: 800 2rem 'Josefin Sans', sans-serif;
  color: #fff;
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
  },
  'pt-BR': {
    'movies-title': 'Filmes',
    'series-title': 'Séries',
  },
};

const Home = observer(({
  contentStore
}) => {
  I18n.setLanguage(navigator.language === 'pt-BR' ? navigator.language : 'en');
  I18n.putVocabularies(dict);

  const moviesList = contentStore.getMovies();
  const seriesList = contentStore.getSeries();

  const getMovies = async () => {
    try {
      const response = await trendingClient({
        method: 'get',
      });

      const movies = response.data.results
        .filter(movie => movie.media_type === 'movie')
        .map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          score: movie.vote_average,
          posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
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
          posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
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
      <ListBox>
        {moviesList.map(movie => <Card key={movie.id} item={movie} />)}
      </ListBox>
    </Content>
  );

  const renderSeries = () => (
    <Content>
      <Title>{I18n.get('series-title')}</Title>
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