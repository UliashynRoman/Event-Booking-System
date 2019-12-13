import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainNavigation.css';

import AuthContext from '../../context/auth-context';

const mainNavigation = props => (
    <AuthContext.Consumer>{(context)=>{
        return(
            <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>BestEventer</h1>
            </div>
            
            <div  className="main-navigation__items"> 
                <ul>
                    {!context.token &&(
                        <li><NavLink to="/auth">Auth</NavLink></li>
                        )}

                    {context.isAdmin && (<li><h1>ADMIN HERE</h1></li>)}
                        
                    <li><NavLink to="/events">Events</NavLink></li>
                    {context.token && (
                        <li><NavLink to="/bookings">Bookings</NavLink></li>
                        )}
                    {context.token && <li onClick={context.logout}><NavLink to="/auth">Logout</NavLink></li>}
                </ul>
            </div>
        </header>
        );
    }}
    
    </AuthContext.Consumer>
);

export default mainNavigation;