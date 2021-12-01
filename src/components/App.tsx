import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Header } from './common/header';
import { Footer } from './common/footer';
import { SizeIndicator } from './common/SizeIndicator';
import { ReadPage } from './read/ReadPage';
import { Home } from './home/Home';
import { DoPage } from './do/DoPage';
import { Help } from './common/Help';
import { FourOhFour } from './common/FourOhFour';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { PrayerPage } from './prayer/PrayerPage';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route key="/" exact path="/" component={Home} />
            <Route key="/prayer" path="/prayer" component={PrayerPage} />
            <Route key="/read" path="/read" component={ReadPage} />
            <Route key="/do" path="/do" component={DoPage} />
            <Route key="/help" path="/help" component={Help} />
            <Route path="*" component={FourOhFour} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
      <div aria-live="polite" aria-atomic="true">
        <ToastContainer position="bottom-end" id="main-toast-container" />
      </div>
      <SizeIndicator />
    </div>
  );
}
