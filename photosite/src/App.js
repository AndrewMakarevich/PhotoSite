import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AppRouter from './components/appRouter';
import NavBar from './components/navBar.js';
import { Context } from './index';
import './App.css';
import animatedInputs from './inputAnimation';
import { PERSONAL_CABINET_ROUTE } from './utils/consts';


import { registration, login, check } from './http/userAPI';


const App = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  // REGISTRATION AND AUTHORIZATION INFO
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const signIn = async () => {
    try {
      if (password === repPassword) {
        const response = await registration(nickname, email, password);
        alert(response.message);
        return console.log(response.token);
      } else {
        alert("Пароли не совпадают");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const logIn = async () => {
    try {
      const response = await login(email, password);
      await user.setUser(response.token);
      await user.setIsAuth(true);
      history.push(PERSONAL_CABINET_ROUTE);//Чтобы избавиться от undefined значения history, в index.js обернул <App /> в <BrowserRouter></BrowserRouter> ПОЧЕМУ?
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert(e);
      }
    }
  };
  useEffect(() => {
    animatedInputs();
    const token = localStorage.getItem('token');
    if (token) {
      check().then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      });
    } else {
      localStorage.removeItem('token');
    }

  }, []);

  return (

    <BrowserRouter>
      <NavBar />
      <div className="modalBackgroundReg authorizationModalBackground hidden">
        <div className="modalWindowReg authorizationModal">
          <div className="modalWindowReg-closeButtonBlock authorizationModalCloseBtn">
            <div className="closeButtonReg authorizationModalCloseBtn_button">
              <span className="firstLine"></span>
              <span className="secLine"></span>
            </div>
          </div>

          <div className="modalWindowReg-headerBlock authorizationModalHeader">
            <div className="modalWindowReg-header">
              REGISTRATION
            </div>

          </div>

          <div className="modalWindowReg-mainBlock authorizationModalMainBlock">
            <div className="modalWindowReg-mainBlock-nickNameBlock authorizationModalInput">

              <input onChange={(e) => setNickname(e.target.value)} className="modalWindowReg-mainBlock-nickName"></input>
              <label>nickname</label>
              <span />
            </div>
            <div className="modalWindowReg-mainBlock-emailBlock authorizationModalInput">


              <input type="email" onChange={(e) => setEmail(e.target.value)} className="modalWindowReg-mainBlock-email"></input>
              <label>email</label>
              <span />
            </div>
            <div className="modalWindowReg-mainBlock-passwordBlock authorizationModalInput">


              <input type="password" onChange={(e) => setPassword(e.target.value)} className="modalWindowReg-mainBlock-password"></input>
              <label>password</label>
              <span />
            </div>
            <div className="modalWindowReg-mainBlock-repPasswordBlock authorizationModalInput">


              <input onChange={(e) => { setRepPassword(e.target.value) }} className="modalWindowReg-mainBlock-repPassword"></input>
              <label>repeat password</label>
              <span />
            </div>
          </div>
          <div className="modalWindowReg-bottomBlock">
            <button
              className="authorizationModalSubmitButton"
              onClick={() => {
                signIn();
              }}>
              SIGN UP
            </button>
          </div>

        </div>
      </div>
      <div className="modalBackgroundLog authorizationModalBackground hidden">
        <div className="modalWindowLog authorizationModal">
          <div className="modalWindowLog-closeButtonBlock authorizationModalCloseBtn">
            <div className="closeButtonLog authorizationModalCloseBtn_button">
              <span className="firstLine"></span>
              <span className="secLine"></span>
            </div>
          </div>
          <div className="modalWindowLog-headerBlock authorizationModalHeader">
            LOG MODAL
          </div>
          <div className="modalWindowLog-mainBlock authorizationModalMainBlock">
            <div className="modalWindowLog-mainBlock-emailBlock authorizationModalInput">

              <input className="modalWindowLog-mainBlock-email" onChange={(e) => setEmail(e.target.value)}></input>
              <label>email</label>
              <span />
            </div>
            <div className="modalWindowLog-mainBlock-passwordBlock authorizationModalInput">

              <input className="modalWindowLog-mainBlock-password" onChange={(e) => setPassword(e.target.value)}></input>
              <label>password</label>
              <span />
            </div>
          </div>
          <div className="modalWindowLog-bottomBlock">
            <button className="authorizationModalSubmitButton" onClick={() => { logIn() }}>LOG IN</button>
          </div>
        </div>
      </div>
      <div className="routePages">
        <AppRouter />

      </div>


    </BrowserRouter>

  );

});

export default App;
