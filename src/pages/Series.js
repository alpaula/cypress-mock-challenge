// Libs
import React, { useEffect } from 'react';
import { I18n } from '@aws-amplify/core';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

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

  @media (max-width: 480px) {
    padding: 1rem;
  }
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
  const isLoading = contentStore.isLoading;

  useEffect(() => {
    if (!seriesList.length) {
      contentStore.setLoading();
      setTimeout(() => {
        contentStore.saveSeries();
      }, 1500);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSeries = () => (
    <Content>
      <Title>{I18n.get('series-title')}</Title>
      <ListBox>
        {seriesList.map(serie =>
          <Card
            key={serie.id}
            contentStore={contentStore}
            item={serie}
          />
        )}
      </ListBox>
    </Content>
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
      {renderSeries()}
    </Container>
  );
});

export default Series;