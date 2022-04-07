// Libs
import React, { useEffect } from 'react';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

// Axios
import { moviesClient } from '../dataflow/axios/axios';

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
  margin-bottom: 2rem;
  font: 800 2.5rem 'Josefin Sans', sans-serif;
  color: #fff;
  text-align: center;
`;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 3rem;
`;

const dict = {
  en: {
    'movies-title': 'Movies',
  },
  'pt-BR': {
    'movies-title': 'Filmes',
  },
};

const Movies = observer(({
  contentStore
}) => {
  const language = navigator.language === 'pt-BR' ? navigator.language : 'en';

  I18n.setLanguage(language);
  I18n.putVocabularies(dict);

  const moviesList = contentStore.getMovies();

  const getMovies = async () => {
    try {
      const response = await moviesClient({
        method: 'get',
        url: `&language=${language}`
      });

      const movies = response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        score: movie.vote_average,
        posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
        adult: movie.adult,
        popularity: movie.popularity,
        backdropImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.backdrop_path}`
      }));

      contentStore.saveMovies(movies);
    } catch (error) { console.log('error: ', error) }
  }

  useEffect(() => {
    if (!moviesList.length) {
      getMovies();
    }
  }, []);

  const renderMovies = () => (
    <Content>
      <Title>{I18n.get('movies-title')}</Title>
      <ListBox>
        {moviesList.map(movie =>
          <Card key={movie.id} item={movie} />
        )}
      </ListBox>
    </Content>
  );

  return (
    <Container>
      {renderMovies()}
    </Container>
  );
});

export default Movies;