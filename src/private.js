// Libs
import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Private = (props) => {
  const [validated, setValidated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = () => {
    const credentials = window.localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`);

    if (credentials) {
      return true;
    }

    return false;
  };

  const getAuth = async () => {
    try {
      if (getToken()) {
        setValidated(true);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setValidated(true);

        window.localStorage.removeItem(`${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setValidated(true);

      window.localStorage.removeItem(`${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`);
    }
  };

  useEffect(() => {
    getAuth();
  }, [props.location.key]);

  const renderRoute = () => {
    const { component: Component, ...rest } = props;

    return <Route {...rest} component={Component} />;
  };

  return (
    <Fragment>
      {validated && isAuthenticated && renderRoute()}
      {validated && !isAuthenticated && <Redirect to="/login" />}
    </Fragment>
  );
}

export default withRouter(Private);
