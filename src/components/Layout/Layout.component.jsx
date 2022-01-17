import React from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../../pages/Header';
import './Layout.styles.css';
import { useAuth } from '../../providers/Auth';
import SideBar from '../../pages/SideBar';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from "../../utils/contexts/AppContext";

// eslint-disable-next-line react/prop-types

const Main = styled.main`
  height: 100%;
  background-color: ${ (props) => props.themeIsDark ? '#322A37' : '#fdfdfd'};
  color: ${ (props) => props.themeIsDark ? '#fff' : '#000'};
`;

function Layout({ children }) {
  const { authenticated, logout } = useAuth();
  const { appContext } = useAppContext();
  const history = useHistory();

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/home');
  }

  return (
    <Main title="main" className="container" themeIsDark={appContext.themeIsDark}>
      <Header />
      <Grid>
      {authenticated && (
          <Grid.Column width={3}>
            <SideBar logout={deAuthenticate} />
          </Grid.Column>
        )}
        <Grid.Column width={authenticated ? 13 : 16}>
          {children}
        </Grid.Column>
      </Grid>
    </Main>
  );
}

export default Layout;
