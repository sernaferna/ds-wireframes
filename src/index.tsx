import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { App } from './components/App';
import store, { persister } from './stores/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
