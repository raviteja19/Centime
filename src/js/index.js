import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import App from './App'
import Header from './Header'
import app from '../css/app.css';
const store=configureStore();



ReactDOM.render(<Provider store={store}>
    <Fragment>
        <Header/>
        <App/>
    </Fragment>
    </Provider>,document.getElementById('root'));