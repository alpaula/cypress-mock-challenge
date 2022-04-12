// Libs
import React from 'react';
import styled from 'styled-components';
import { I18n } from '@aws-amplify/core';

// Images
import logo from '../assets/logo.png';

// Styles
const Container = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0 3rem;
  background-color: #ffffffe6;
  box-shadow: 0 0 15px #00000033;
  backdrop-filter: blur(2px);
  z-index: 1;
`;

const BoxLogo = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 .5rem;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 85%;
`;

const LogoLabel = styled.label`
  position: absolute;
  bottom: .375rem;
  right: 0;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
`;

const TabsList = styled.div`
  display: flex;
  align-items: center;
`;

const TabItem = styled.button`
  margin: 0 .75rem;
  border: none;
  background-color: transparent;
  font: 300 1.25rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
  outline: none;
  cursor: pointer;

  ${({ isSelected }) => isSelected && `
    text-decoration: underline;
    font-weight: 600;
  `}

  :hover {
    color: var(--ceci-medium);
  }
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  font: 300 1rem 'Josefin Sans', sans-serif;
  color: var(--ceci-text);
`;

const dict = {
  en: {
    'logout-button': 'Logout',
    'home-tab': 'Home',
    'movies-tab': 'Movies',
    'series-tab': 'Series',
  },
  'pt-BR': {
    'logout-button': 'Sair',
    'home-tab': 'Home',
    'movies-tab': 'Filmes',
    'series-tab': 'Séries',
  },
};

const tabsList = [
  { id: 0, name: 'home-tab', pathname: '/' },
  { id: 1, name: 'movies-tab', pathname: '/movies' },
  { id: 2, name: 'series-tab', pathname: '/series' },
];

const Header = ({
  handleLogout,
  history
}) => {
  I18n.setLanguage(navigator.language === 'pt-BR' ? navigator.language : 'en');
  I18n.putVocabularies(dict);

  const renderTabs = () => (
    <TabsList>
      {tabsList.map(tab => {
        const { pathname } = history.location;
        const isSelected = pathname === tab.pathname || pathname === `${tab.pathname}/`;

        return (
          <TabItem
            key={tab.id}
            onClick={() => history.push(tab.pathname)}
            isSelected={isSelected}
          >
            {I18n.get(tab.name)}
          </TabItem>
        );
      })}
    </TabsList>
  );

  return (
    <Container>
      <BoxLogo onClick={() => history.push('/')}>
        <Logo src={logo} />
        <LogoLabel>tv</LogoLabel>
      </BoxLogo>
      {renderTabs()}
      <LogoutButton onClick={handleLogout}>
        {I18n.get('logout-button')}
      </LogoutButton>
    </Container>
  );
};

export default Header;