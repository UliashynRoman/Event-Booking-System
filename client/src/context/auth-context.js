// Acces conext anywhere  in component tree
import React from 'react';


export default React.createContext({
    token: null,
    userId: null,
    isAdmin: false,
    login: (token,userId,isAdmin,tokenExpiration)=>{},
    logout: () =>{}
});
