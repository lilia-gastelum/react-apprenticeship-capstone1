import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import WatchLater from '../../pages/WatchLater';
import Layout from '../Layout';
import VideoPlayer from '../../pages/VideoPlayer';
import Private from '../Private';
import NotFound from '../NotFound';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route path="/video/:videoId">
              <VideoPlayer />
            </Route>
            <Route exact path="/notFound">
              <NotFound />
            </Route>
            <Private>
              <Route exact path="/favorites">
                <Favorites />
              </Route>
              <Route exact path="/watchLater">
                <WatchLater />
              </Route>
            </Private>
          </Switch>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
