import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

/* variable to access your store and expose it to the window.
 It should not be exposed in production, be sure this is only set in development.
 */

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

/* Root React functional component that returns the App component wrapped in Redux's Provider
and React Router DOM's BrowserRouter provider components.
*/
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
/* all ReactDOM.render function
passing in the Root component and the HTML element with the id of "root".
*/
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
