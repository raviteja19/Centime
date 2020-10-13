import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from '../js/App'
import configureStore from '../js/store';
import {Provider} from 'react-redux';

configure({ adapter: new Adapter() });
const store=configureStore();


