import React,{useContext,useEffect,useState} from 'react';
import {observer} from 'mobx-react-lite';
import { Context } from '../index';
import { getUserInfo } from '../http/userAPI';
import PersonalCabModalWindow from '../components/personalCabinet/PersonalCabModalWindow';
import toggleModalScript from '../components/personalCabinet/modalWindowScript';


const PersonalCabinet = observer(() =>{
    const {user} = useContext(Context);
    const [userInfo, setUserInfo] = useState([]);
    const logOut= async()=>{
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }; 
    useEffect(()=>{
        getUserInfo().then(data=>{
            console.log(data.user);
            setUserInfo(data.user)});    
    },[user._user]);

    useEffect(()=>{
        toggleModalScript();
    },[]);
    
    return(
        <>
            <div>PERSONAL CABINET</div>
            <div>
                <ul>
                    <li>{userInfo.id}</li>
                    <li>{userInfo.email}</li>
                    <li>{userInfo.nickname}</li>
                    <li>{userInfo.role}</li>
                </ul>
                
            </div>
            <button className="openPersonalCabModalBtn">open modal</button>
            <PersonalCabModalWindow/>

            <button onClick={()=>{logOut()}}>LOG OUT</button>
        </>        
    )
});

export default PersonalCabinet;