// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import { songsReducer } from './songs';
import { albumsReducer } from './albums';

const rootReducer = combineReducers({
  session: sessionReducer,
  song: songsReducer,
  album: albumsReducer

});

/* Initialize an enhancer variable that will be set to different store enhancers
depending on if the Node environment is in development or production. */
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//configure store function to attach redux to react application
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
