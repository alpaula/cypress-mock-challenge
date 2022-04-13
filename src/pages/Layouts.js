// Libs
import React, { useEffect, useRef } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';

import { rootStore } from '../dataflow/models/root';

// Components
import Header from '../components/Header';
import Home from './Home';
import Movies from './Movies';
import Series from './Series';
import SelectedMovie from './SelectedMovie';
import SelectedSerie from './SelectedSerie';

// Styles
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 3rem;
  background-color: var(--ceci-medium-second);
  overflow-y: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #c9729f;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
  }

  @media (max-width: 480px) {
    ::-webkit-scrollbar {
      width: 2px;
    }
  }
`;

const Layouts = (props) => {
  const history = useHistory();
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = 0;
  }, [history.location.pathname]);

  const handleLogout = () => {
    window.localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`
    );
    window.localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_ORGANIZATION}`
    );

    history.replace(`/login`);
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
          <SelectedMovie
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
      <Route
        exact
        path={['/serie/:id']}
        render={(props) =>
          <SelectedSerie
            {...props}
            contentStore={rootStore.contentStore}
          />
        }
      />
      <Redirect to={'/'} />
    </Switch>
  );

  return (
    <Container ref={containerRef}>
      <Header
        handleLogout={handleLogout}
        history={props.history}
      />
      {renderLayout()}
    </Container>
  );
};

export default Layouts;
