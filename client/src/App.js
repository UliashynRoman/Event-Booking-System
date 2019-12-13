import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/auth';
import BookingsPage from './pages/bookings';
import EventsPage from './pages/events';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context';


import './App.css';
import { TokenKind } from 'graphql';



class App extends Component {

  //create variables to for seeting 
  state = {
    token: null,
    userId: null,
    isAdmin: false
  }

  //setting methods
  login = (token,userId,isAdmin,tokenExpiration) =>{
    this.setState({token: token,userId: userId,isAdmin: isAdmin});
  };

  logout = () => {
    this.setState({token: null,userId:null,isAdmin:false});
  }

  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        {/* Set props in Context  */}
        <AuthContext.Provider value={{
              token: this.state.token,
              userId: this.state.userId,
              isAdmin: this.state.isAdmin,
              login: this.login ,
              logout: this.logout}}>

            <MainNavigation/>
            
              <main className="main-content">
              <Switch>
                  {/* if token exist, redirect to events */}
                  {this.state.token && <Redirect from="/" to="/events" exact />}

                  {/* if token exist, redirect from auth to events */}
                  {this.state.token && (
                    <Redirect from="/auth" to="/events" exact />
                  )}

                  {/* if no token, set auth route to auth page */} 
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  
                  {/* In any case , set path events routes to event page. DM if you are logged or not */}
                  <Route path="/events" component={EventsPage} />
                  
                  {/* Allow routes to bookings only if you logged */}
                  {this.state.token && (
                    <Route path="/bookings" component={BookingsPage} />
                  )}

                  {/* if you are not logged, redirect to auth */}
                  {!this.state.token && <Redirect to="/auth" exact />}
                </Switch>
              </main>
        </AuthContext.Provider>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;