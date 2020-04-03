import React from 'react';
import ReactDOM from 'react-dom';

// ===================================
// Load Scss Style
// ===================================
import './resources/scss/style.scss';


// ===================================
// Third party library
// ===================================
import { BrowserRouter } from 'react-router-dom';

// Redux Setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers';

// ===================================
//  Load Routes File
// ===================================
import Routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer)}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));