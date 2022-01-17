import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import Layout from '../Layout';
import VideoPlayer from '../../pages/VideoPlayer';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/home">
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/video">
              <VideoPlayer />
            </Route>
          </Switch>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
