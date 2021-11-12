import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { Header } from './common/header';
import { Footer } from './common/footer';
import { SizeIndicator } from './common/SizeIndicator';
import { ReadPage } from './read/ReadPage';
import { Home } from './home/Home';
import { DoPage } from './do/DoPage';
import { Help } from './common/Help';
import { FourOhFour } from './common/FourOhFour';
import ToastContainer from 'react-bootstrap/ToastContainer';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route key="/" exact path="/" component={Home} />
              <Route key="/read" path="/read" component={ReadPage} />
              <Route key="/do" path="/do" component={DoPage} />
              <Route key="/help" path="/help" component={Help} />
              <Route path="*" component={FourOhFour} />
            </Switch>
            <Footer />
          </div>
        </Router>
        <ToastContainer position="bottom-end" id="main-toast-container" />
        <SizeIndicator show={true} />
      </div>
    );
  }
}
