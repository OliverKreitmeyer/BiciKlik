import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


const App = process.env.REACT_APP_TEST === 'true' 
    ? require('./App.test').default 
    : require('./App').default;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(  // REACT_APP_TEST=true npm start za Login i SignUp stranicu, npm start za Newsfeed
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
