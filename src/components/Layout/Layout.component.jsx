import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../../pages/Header';
import './Layout.styles.css';
import { useAuth } from '../../providers/Auth';
import SideBar from '../../pages/SideBar';
import styled from 'styled-components';
import { useAppContext } from "../../utils/contexts/AppContext";
import Login from '../../pages/Login';

// eslint-disable-next-line react/prop-types

const Main = styled.main`
  height: 100%;
  background-color: ${ (props) => props.themeIsDark ? '#322A37' : '#fdfdfd'};
  color: ${ (props) => props.themeIsDark ? '#fff' : '#000'};
`;

function Layout({ children }) {
  const { authenticated } = useAuth();
  const { appContext } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <Main title="main" className="container" themeIsDark={appContext.themeIsDark}>
      <Header setOpen={setOpen} />
      <Grid>
      {authenticated && (
          <Grid.Column width={3}>
            <SideBar />
          </Grid.Column>
        )}
        <Grid.Column width={authenticated ? 13 : 16}>
          {children}
        </Grid.Column>
      </Grid>
      <Login open={open} setOpen={setOpen}/>
    </Main>
  );
}

export default Layout;
