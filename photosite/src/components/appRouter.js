import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Context} from '../index';
import { adminRoutes, userRoutes, publicRoutes } from '../routes';
import { MAIN_PAGE_ROUTE } from '../utils/consts';

const AppRouter = observer(() =>{
    const {user} = useContext(Context);
    return(
        <Switch>
            {user.isAuth && user._user.role == "ADMIN" && adminRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component}/>
            )}
            {user.isAuth && user._user.role == "USER" && userRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component}/>
            )}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component}/>
            )}
            <Redirect to={MAIN_PAGE_ROUTE}/>

        </Switch>

    )
});

export default AppRouter;