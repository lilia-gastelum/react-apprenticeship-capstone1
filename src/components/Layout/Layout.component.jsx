import React from 'react';
import { Grid } from 'semantic-ui-react';
import Header from '../../pages/Header';
import './Layout.styles.css';
import { useAuth } from '../../providers/Auth';
import SideBar from '../../pages/SideBar';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Layout({ setTerm, children }) {
  const { authenticated, logout } = useAuth();
  const history = useHistory();

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/home');
  }

  return (
    <main title="main" className="container">
      <Header setTerm={setTerm}/>
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
    </main>
  );
}

export default Layout;
