// Libs
import React, { useEffect } from 'react';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

// Axios
import { seriesClient } from '../dataflow/axios/axios';

// Components
import Card from '../components/Card';

// Styles
const Container = styled.div`
  width: 100%;
  padding: 3rem 0;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 2rem;
  padding-top: .75rem;
  padding-bottom: .25rem;
  font: 800 2.5rem 'Josefin Sans', sans-serif;
  color: #fff;
  border-style: double none double none;
  border-width: 7px;
`;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 3rem;
`;

const dict = {
  en: {
    'series-title': 'Series',
  },
  'pt-BR': {
    'series-title': 'Séries',
  },
};

const Series = observer(({
  contentStore
}) => {
  const language = navigator.language === 'pt-BR' ? navigator.language : 'en';

  I18n.setLanguage(language);
  I18n.putVocabularies(dict);

  const seriesList = contentStore.getSeries();

  const getSeries = async () => {
    try {
      const response = await seriesClient({
        method: 'get',
        url: `&language=${language}`
      });

      const series = response.data.results.map(serie => ({
        id: serie.id,
        title: serie.name,
        description: serie.overview,
        score: serie.vote_average,
        posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.poster_path}`,
        adult: false,
        popularity: serie.popularity,
        backdropImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.backdrop_path}`
      }));

      contentStore.saveSeries(series);
    } catch (error) { console.log('error: ', error) }
  }

  useEffect(() => {
    if (!seriesList.length) {
      getSeries();
    }
  }, []);

  const renderSeries = () => (
    <Content>
      <Title>{I18n.get('series-title')}</Title>
      <ListBox>
        {seriesList.map(serie =>
          <Card key={serie.id} item={serie} />
        )}
      </ListBox>
    </Content>
  );

  return (
    <Container>
      {renderSeries()}
    </Container>
  );
});

export default Series;