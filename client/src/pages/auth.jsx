import React, { Component } from 'react';
import './auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {

    state = {
        isLogin: true,
        isAdmin: false
    }

    static contextType = AuthContext;

    constructor(props){
        super(props);
        //create vars and se  to ref
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.statusEl = React.createRef();
    }

    submitHandler = event =>{
        event.preventDefault();

        //set values from ref
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        //check if our inputs rigth
        if (email.trim().length === 0 || password.trim().length === 0) {
        return;
        }
        //output
        console.log(email,password);
        let requestBody = {
            query: `
                query{
                    login(email:"${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiration
                        isAdmin
                    }
                }
            `
        };
        
        if (!this.state.isLogin) {
            requestBody = {
              query: `
                mutation {
                  createUser(userInput: {email: "${email}", password: "${password}"}) {
                    _id
                    email
                  }
                }
              `
            };
          }

        
        fetch('http://localhost:5000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {//tell what type of data
                'Content-Type': 'application/json'
            }
        }).then(res =>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData =>{
            console.log(resData);
            if (resData.data.login.token){
                this.context.login(
                    resData.data.login.token,
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration);
            }
            

            //Show secret code for admin
            if(resData.data.login.isAdmin || !resData.data.login.isAdmin){
                this.setState(()=>{return {isAdmin: resData.data.login.isAdmin }})
            }

            console.log("Is admin? "+resData.data.login.isAdmin);

        })
        .catch(err => {
            console.log(err);
        });
    };

    //check isLoged
    switchModeHandler = () => {
        
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }
 
  render() {
    return (
        <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailEl}></input>
            </div>
            <div className="form-control">
                <label htmlFor="email">Password</label>
                <input type="password" id="password" ref={this.passwordEl}></input>
            </div>

            {this.state.isAdmin ? <div className="form-control">
                <label htmlFor="email">User Type</label>
                <select>
                    <option value="true" ref={this.statusEl} >Admin</option>
                    <option value="false" ref={this.statusEl} >User</option>
                </select>
            </div> : ''}
            
            <div className="form-actions">
                <button type="button" onClick={this.switchModeHandler}>Switch to 
                     {this.state.isLogin ? ' Signup' : ' Login'}
                </button>
                <button type="submit">Submit</button>
            </div>
            <h1>{this.state.isAdmin ? 'Here Admin': ''}</h1>
        </form>
    
        
    );
  }
}

export default AuthPage;