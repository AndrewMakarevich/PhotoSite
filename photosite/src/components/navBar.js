import React, { useContext } from 'react';
import { Context } from '../index';
import { useHistory } from 'react-router';
import { ADMIN_ROUTE, PERSONAL_CABINET_ROUTE,MAIN_PAGE_ROUTE } from '../utils/consts';
import './navBar.css';
import './activeButton.js';
import './burgerActive.js';


const NavBar = ()=>{
    const {user} = useContext(Context);
    const history = useHistory();

        if(user.isAuth){
            return(
                <div className="AppBar">
                    <div className="burgerMenuIcon">
                        <span className="firstLine"></span>
                        <span className="secLine"></span>
                        <span className="thirdLine"></span>
                    </div>
                    <div className="sectionsMenu">
                        <button  onClick={()=> history.push(ADMIN_ROUTE)}>Admin cabinet</button>
                        <button onClick={()=> history.push(PERSONAL_CABINET_ROUTE)}>Personal cabinet</button>
                        <button onClick={()=> history.push(MAIN_PAGE_ROUTE)}>Main page</button>
                        <button className="registerButton">Register</button>
                        <button className="loginButton">Login</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="AppBar">
                    <div className="sectionsMenu">
                        <button onClick={()=> history.push(MAIN_PAGE_ROUTE)}>Main page</button>
                        <button className="registerButton">Register</button>
                        <button className="loginButton">Login</button>
                    </div>
                </div>
            )
        }

};
export default NavBar;