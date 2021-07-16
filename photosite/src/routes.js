import mainPage from './pages/mainPage/mainPage';
import personalCabinet from './pages/personalCabinet';
import adminCabinet from './pages/adminCabinet';
import { ADMIN_ROUTE, PERSONAL_CABINET_ROUTE,MAIN_PAGE_ROUTE } from './utils/consts';

export const authRoutes =[
    {
        path: ADMIN_ROUTE,
        component: adminCabinet
    },
    {
        path: PERSONAL_CABINET_ROUTE,
        component: personalCabinet
    }
];

export const publicRoutes =[
    {
        path: MAIN_PAGE_ROUTE,
        component: mainPage
    }
];

