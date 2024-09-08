import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({})
     
    useEffect(() => {
        const user = Cookies.get('token');
        console.log(user)
        if(user){
            fetch(`${import.meta.env.VITE_URL}/profile`, { credentials: "include"}).then(response => response.json()).then(userInfo => {
                setUserInfo(userInfo)
            })
        }
    }, [] )


    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}