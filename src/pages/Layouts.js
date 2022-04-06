// Libs
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import styled from 'styled-components';

// Components
import Series from './Series';
import Home from './Home';
import Header from './Header';

// Styles
const Container = styled.div`
  width: 100%;
  height: 100vh;
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
        render={(props) => <Home {...props} />}
      />
      <Route
        exact
        path={'/series/'}
        render={(props) => <Series {...props} />}
      />
      <Route
        exact
        path={'/movies/'}
        render={(props) => <Series {...props} />}
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
