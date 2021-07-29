import React,{useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/appRouter';
import NavBar from './components/navBar.js';
import './modalWindowsScript';
import animatedInputs from './inputAnimation';


function App() {

  useEffect(()=> animatedInputs());

    return (
      
      <BrowserRouter>
          <NavBar/>
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
                  
                  <input className="modalWindowReg-mainBlock-nickName"></input>
                  <label>nickname</label>
                  <span/>
                </div>
                <div className="modalWindowReg-mainBlock-emailBlock authorizationModalInput">
                  
                  
                  <input className="modalWindowReg-mainBlock-email"></input>
                  <label>email</label>
                  <span/>
                </div>
                <div className="modalWindowReg-mainBlock-passwordBlock authorizationModalInput">
                  
                  
                  <input className="modalWindowReg-mainBlock-password"></input>
                  <label>password</label>
                  <span/>
                </div>
                <div className="modalWindowReg-mainBlock-repPasswordBlock authorizationModalInput">
                  
                  
                  <input className="modalWindowReg-mainBlock-repPassword"></input>
                  <label>repeat password</label>
                  <span/>
                </div> 
              </div>
              <div className="modalWindowReg-bottomBlock">
                  <button className="authorizationModalSubmitButton">SIGN UP</button>
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
                                  
                  <input  className="modalWindowLog-mainBlock-email"></input>
                  <label>email</label>  
                  <span/>
                </div>
                <div className="modalWindowLog-mainBlock-passwordBlock authorizationModalInput">
                  
                  <input className="modalWindowLog-mainBlock-password"></input>
                  <label>password</label>
                  <span/>
                </div>
              </div>  
              <div className="modalWindowLog-bottomBlock">
                  <button className="authorizationModalSubmitButton">LOG IN</button>
              </div>
            </div>
          </div>
          <div className="routePages">
            <AppRouter/>
            
          </div>
         
          
      </BrowserRouter>
        
      );
  
}

export default App;
