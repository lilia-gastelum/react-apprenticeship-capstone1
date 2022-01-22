import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
// import NotFound from '../../pages/NotFound';
// import SecretPage from '../../pages/Secret';
// import Private from '../Private';
// import Fortune from '../Fortune';
import Layout from '../Layout';
import VideoPlayer from '../../pages/VideoPlayer';
// import { random } from '../../utils/fns';

function App() {
  const [ term, setTerm ] = useState('wizeline');
  // useLayoutEffect(() => {
  //   const { body } = document;

  //   function rotateBackground() {
  //     const xPercent = random(100);
  //     const yPercent = random(100);
  //     body.style.setProperty('--bg-position', `${xPercent}% ${yPercent}%`);
  //   }

  //   const intervalId = setInterval(rotateBackground, 3000);
  //   body.addEventListener('click', rotateBackground);

  //   return () => {
  //     clearInterval(intervalId);
  //     body.removeEventListener('click', rotateBackground);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout setTerm={setTerm}>
          <Switch>
            <Route exact path="/home">
              <HomePage term={term}/>
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
