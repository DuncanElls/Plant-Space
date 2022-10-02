import React from 'react'
import './Login.css'
import { useBoolean } from '../../hooks/UseBoolean';
import LoginForm from './loginForm/LoginForm'
import SignUpForm from './signUpForm/SignUpForm'

export default function Login({ onLogin, onSignupSuccessful }) {

    const [isLoginShown, toggleIsLoginShown] = useBoolean(true);

    return (
        <div className='login-root'>
            {isLoginShown
                ? <h1>Log In</h1>
                : <h1>Sign Up</h1>
            }
            <div className='form'>
                {
                    isLoginShown
                        ? <LoginForm onLogin={onLogin} />
                        : <SignUpForm onSignupSuccessful={onSignupSuccessful} />
                }
            </div>
            <hr />
            <div className='switch'>
                <p>
                    {
                        isLoginShown
                            ? 'Need to make an account?'
                            : 'Already have an account?'
                    }
                </p>
                <button onClick={() => {
                    toggleIsLoginShown();
                }}>
                    {
                        isLoginShown
                            ? 'Sign Up'
                            : 'Log In'
                    }
                </button>
            </div>
        </div>
    )
}
