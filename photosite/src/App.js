import React,{useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/appRouter';
import NavBar from './components/navBar.js';
import './modalWindowsScript';
import AnimateSlider from './pages/mainPage/photoAnimation';


function App() {



    return (
      
      <BrowserRouter>
          <NavBar/>
          <div className="modalBackgroundReg hidden">
            <div className="modalWindowReg">REG MODAL
              <div className="closeButtonReg">
                <span className="firstLine"></span>
                <span className="secLine"></span>
              </div>
            </div>
          </div>
          <div className="modalBackgroundLog hidden">
            <div className="modalWindowLog">LOG MODAL
              <div className="closeButtonLog">
                <span className="firstLine"></span>
                <span className="secLine"></span>
              </div>
            </div>
          </div>
          <div className="routePages">
            <AppRouter/>
            
          </div>
         
          
      </BrowserRouter>
        
      );
  // }else{
  //     return (
  //   <BrowserRouter>
  //       <NavBar/>
  //       <div className="modalBackgroundReg hidden">
  //         <div className="modalWindowReg">REG MODAL
  //           <div className="closeButtonReg">
  //             <span className="firstLine"></span>
  //             <span className="secLine"></span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="modalBackgroundLog hidden">
  //         <div className="modalWindowLog">LOG MODAL
  //           <div className="closeButtonLog">
  //             <span className="firstLine"></span>
  //             <span className="secLine"></span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="routePages">
  //         <AppRouter/>
  //       </div>
  //   </BrowserRouter>
      
  //   );
  // }
  
}

export default App;
