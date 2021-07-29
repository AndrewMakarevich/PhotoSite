import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import UserStore from './store/userStore';
import AboutUsStore from './store/aboutUsStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    "user": new UserStore(),
    "aboutUs": new AboutUsStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
