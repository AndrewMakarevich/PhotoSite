import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { useHistory } from 'react-router';
import { ADMIN_ROUTE, PERSONAL_CABINET_ROUTE, MAIN_PAGE_ROUTE } from '../utils/consts';
import './navBar.css';
import activeButtons from './activeButton';
import adaptiveNavMenu from './burgerActive';
import modalWindowsScript from '../modalWindowsScript';
import { observer } from 'mobx-react-lite';



const NavBar = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        modalWindowsScript();
        adaptiveNavMenu();
        activeButtons();
    }, [user.isAuth, user._user]);
    return (
        <div className="AppBar">
            <div className="burgerMenuIcon">
                <span className="firstLine"></span>
                <span className="secLine"></span>
                <span className="thirdLine"></span>
            </div>
            {
                (user.isAuth ?
                    (user._user.role === "ADMIN" ?
                        <div className="sectionsMenu">
                            <div>
                                <button onClick={() => history.push(ADMIN_ROUTE)}>Admin cabinet</button>
                                <button onClick={() => history.push(PERSONAL_CABINET_ROUTE)}>Personal cabinet</button>
                                <button onClick={() => history.push(MAIN_PAGE_ROUTE)}>Main page</button>
                            </div>
                            <div>
                                <button className="registerButton">Register</button>
                                <button className="loginButton">Login</button>
                            </div>

                        </div>
                        :
                        <div className="sectionsMenu">
                            <div>
                                <button onClick={() => history.push(PERSONAL_CABINET_ROUTE)}>Personal cabinet</button>
                                <button onClick={() => history.push(MAIN_PAGE_ROUTE)}>Main page</button>
                            </div>
                            <div>
                                <button className="registerButton">Register</button>
                                <button className="loginButton">Login</button>
                            </div>

                        </div>
                    )

                    :
                    <div className="sectionsMenu">
                        <div>
                            <button onClick={() => history.push(MAIN_PAGE_ROUTE)}>Main page</button>
                        </div>
                        <div>
                            <button className="registerButton">Register</button>
                            <button className="loginButton">Login</button>
                        </div>


                    </div>
                )
            }
        </div>
    )
});
export default NavBar;