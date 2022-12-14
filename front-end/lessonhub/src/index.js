/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-multiselect.css';
import App from './App';
import 'tachyons';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
