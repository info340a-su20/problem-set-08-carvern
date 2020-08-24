import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import senatorsList from "./senators.json";
ReactDOM.render(<App senators={senatorsList} />, document.getElementById('root'));