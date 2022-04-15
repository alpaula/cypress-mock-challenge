// Libs
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { I18n } from '@aws-amplify/core';
import axios from 'axios';

// Images
import logo from '../assets/logo.png';
import passwordIcon from '../assets/password.png';
import passwordHideIcon from '../assets/password-hide.png';
import loadingIcon from '../assets/spinning.svg';

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--ceci-light-second-transparent);
`;

const BoxLogo = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  height: 4rem;
`;

const LogoLabel = styled.label`
  position: absolute;
  bottom: .5rem;
  right: 0;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
`;

const Content = styled.div`
  position: relative;
  width: 25rem;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 15px #00000033;

  @media (max-width: 480px) {
    width: 85%;
  }
`;

const Title = styled.h1`
  text-align: center;
  font: 300 2.25rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
`;

const InputLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: .75rem;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
`;

const Input = styled.input`
  height: 2.5rem;
  margin-top: .25rem;
  padding-left: .5rem;
  border: 1px solid ${props => props.isError ? 'var(--ceci-error)' : 'var(--ceci-text)'};
  border-radius: .25rem;
  outline: none;
  font: 300 1.125rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);

  ::placeholder {
    opacity: .5;
  }
`;

const PasswordButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
`;

const PasswordIcon = styled.img`
  pointer-events: none;
`;

const ErrorText = styled.span`
  position: absolute;
  bottom: 4.125rem;
  font: 300 .875rem 'Josefin Sans', sans-serif;
  color: var(--ceci-error);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.75rem;
  margin-top: 1.75rem;
  border: none;
  border-radius: .25rem;
  background-color: var(--ceci-medium-second);
  font: 300 1.125rem 'Josefin Sans', sans-serif;
  color: #fff;
  cursor: pointer;

  :disabled {
    opacity: .5;
    cursor: initial;
  }
`;

const Loading = styled.img`
  height: 1.25rem;
`;

const dict = {
  en: {
    'login-title': 'Login',
    'login-email-placeholder': 'Type your email here',
    'login-password': 'password',
    'login-password-placeholder': 'Type your password here',
    'user-no-authorized': 'wrong email and/or password, try again',
    'capslock-message': 'capsLock is on',
    'invalid-email-format': 'Verify email format',
  },
  'pt-BR': {
    'login-title': 'Entrar',
    'login-email-placeholder': 'Digite seu email',
    'login-password': 'senha',
    'login-password-placeholder': 'Digite sua senha',
    'user-no-authorized': 'usuário e/ou senha errados, tente novamente',
    'capslock-message': 'capsLock está ativado',
    'invalid-email-format': 'Verifique o formato de email',
  },
};

const Login = ({ history }) => {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  I18n.setLanguage(navigator.language === 'pt-BR' ? navigator.language : 'en');
  I18n.putVocabularies(dict);

  const validateEmail = (email) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return expression.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    try {
      const isEmail = validateEmail(emailValue);
      if (isEmail) {
        setLoading(true);

        const response = await axios({
          method: 'post',
          url: '/login',
          data: {
            email: emailValue,
            password: passwordValue
          }
        });

        localStorage.setItem(
          `${process.env.REACT_APP_LOCALSTORAGE_CREDENTIALS}`,
          JSON.stringify(response.data)
        );

        history.push('/home');
      } else {
        setError('invalid-email-format');
      }

      setLoading(false);
    } catch (er) {
      setError('user-no-authorized');
      setLoading(false);
    }
  }

  const handleKeyUp = ev => {
    if (ev.key === 'Enter' && emailValue && passwordValue) {
      handleLogin();
    }
  }

  const handleChangeEmail = ev => {
    setError(null);
    setEmail(ev.target.value);
  }

  const handleChangePassword = ev => {
    setError(null);
    setPassword(ev.target.value);
  }

  const handleChangePasswordType = () => {
    setPasswordType(passwordType === 'text' ? 'password' : 'text');
  }

  const renderForm = () => {
    return (
      <Fragment>
        <InputLabel>
          email
          <Input
            value={emailValue}
            placeholder={I18n.get('login-email-placeholder')}
            onChange={handleChangeEmail}
            isError={error}
            data-testid='email-input'
          />
        </InputLabel>
        <InputLabel>
          {I18n.get('login-password')}
          <Input
            value={passwordValue}
            type={passwordType}
            placeholder={I18n.get('login-password-placeholder')}
            onChange={handleChangePassword}
            onKeyUp={handleKeyUp}
            isError={error}
            data-testid='password-input'
          />
          <PasswordButton onClick={handleChangePasswordType}>
            <PasswordIcon src={passwordType === 'text' ? passwordIcon : passwordHideIcon} />
          </PasswordButton>
        </InputLabel>
        {error &&
          <ErrorText
            data-testid='error-message'
          >
            {I18n.get(error)}
          </ErrorText>}
        <Button
          onClick={handleLogin}
          data-testid='login-button'
          disabled={!emailValue || !passwordValue || isLoading}
        >
          {isLoading
            ? <Loading src={loadingIcon} />
            : I18n.get('login-title')}
        </Button>
      </Fragment>
    );
  }

  return (
    <Container>
      <BoxLogo>
        <Logo src={logo} />
        <LogoLabel>tv</LogoLabel>
      </BoxLogo>
      <Content>
        <Title>{I18n.get('login-title')}</Title>
        {renderForm()}
      </Content>
    </Container>
  );
};

export default Login;