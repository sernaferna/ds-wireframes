import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/ds-styles.scss';
import { App } from './components/App';
import store from './stores/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
