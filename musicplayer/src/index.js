import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import ErrorBoundary from './components/Error/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </HashRouter>
  </Provider>
);

reportWebVitals();
