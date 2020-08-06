import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

import {createStore} from 'redux';
import rootReducer from './_reducers';
import {Provider} from 'react-redux';

// import Reducer from './_reducers';
//import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';

//const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const myStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(

  <Provider
    store={myStore}
    // store={createStoreWithMiddleware(
    //     Reducer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // )}
  >

    <BrowserRouter>
        <App />
    </BrowserRouter>

  </Provider>

, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
