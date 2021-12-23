import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './ds-styles.scss';
import { App } from './components/App';
import store from './stores/Store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
