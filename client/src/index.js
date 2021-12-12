import React from 'react';
import ReactDOM from 'react-dom';
// средства маршрутизации
import { BrowserRouter as Router } from 'react-router-dom'
// стили
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// комопненты
import App from './App';

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);