import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Context} from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { MAIN_PAGE_ROUTE } from '../utils/consts';

const AppRouter = () =>{
    const {user} = useContext(Context);
    return(
        <Switch>
            {user.isAuth && authRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component}/>
            )}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component}/>
            )}
            <Redirect to={MAIN_PAGE_ROUTE}/>

        </Switch>

    )
};

export default AppRouter;