// Libs
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';

import { rootStore } from '../dataflow/models/root';

// Components
import Header from '../components/Header';
import Home from './Home';
import Movies from './Movies';
import Series from './Series';

// Styles
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 3rem;
  background-color: var(--ceci-medium-second);
`;

const Layouts = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`
    );
    window.localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_ORGANIZATION}`
    );

    window.location = `${process.env.REACT_APP_REDIRECT_URI}/login`;
  };

  const renderLayout = () => (
    <Switch>
      <Route
        exact
        path={'/'}
        render={(props) =>
          <Home
            {...props}
            contentStore={rootStore.contentStore}
          />
        }
      />
      <Route
        exact
        path={'/movies/'}
        render={(props) =>
          <Movies
            {...props}
            contentStore={rootStore.contentStore}
          />
        }
      />
      <Route
        exact
        path={['/movie/:id']}
        render={(props) =>
          <Series
            {...props}
            contentStore={rootStore.contentStore}
          />
        }
      />
      <Route
        exact
        path={'/series/'}
        render={(props) =>
          <Series
            {...props}
            contentStore={rootStore.contentStore}
          />
        }
      />
      <Redirect to={'/'} />
    </Switch>
  );

  return (
    <Container>
      <Header
        handleLogout={handleLogout}
        history={props.history}
      />
      {renderLayout()}
    </Container>
  );
};

export default Layouts;
