import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configureStore';
import App from '../containers/App';
import { Provider } from 'react-redux';
import './index.less';

const data = localStorage.getItem('data');
const initialStore = data ? JSON.parse(data) : {};

if (window.quark) {
  quark.debug = true;
  quark.resizePopup({
    width: 390,
    height: 565,
  });
  quark.setupPreferences([
    {"label": "General", "identifier": "general", "icon": "NSPreferencesGeneral", "height": 192},
  ]);
}

const store = configureStore(initialStore);

store.subscribe(() => {
  localStorage.setItem('data', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
