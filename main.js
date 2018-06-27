import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

// importing factory function form redux-saga
import createSagaMiddleware from 'redux-saga';

import Counter from './Counter';
import reducer from './reducers';

import helloSaga from './sagas';

// create middleware using factory function, createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

// run helloSaga
sagaMiddleware.run(helloSaga);

const action = type => store.dispatch({type});

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
