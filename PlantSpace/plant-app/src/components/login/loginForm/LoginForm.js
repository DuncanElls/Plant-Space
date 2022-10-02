import React, { useContext, useState } from 'react'
import './LoginForm.css'
import http from '../../../services/api.service';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {

    const { login } = useContext(UserContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [wasLoginFailed, setWasLoginFailed] = useState(false);
    const [isPasswordVisible, setisPasswordVisible] = useState(false);


    function handleFormSubmit(e) {
        e.preventDefault()

        setIsLoading(true);
        setWasLoginFailed(false);

        attemptLogIn();
    }

    function handleInputChange(e) {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function attemptLogIn() {
        console.log('logging in');
        http.login(formData)
            .then(results => {
                let user = results.data;
                // context -> login(user)
                login && login(user);
                onLogin && onLogin(user)
                navigate('/myGarden')
            }).catch(err => {
                console.error(err);
                setWasLoginFailed(true)
            }).finally(() => {
                console.log('done loading');
                setIsLoading(false)
            })
    }

    return (
        <form className='login-form'
            onSubmit={handleFormSubmit}>
            <div className='username input-group'>
                <label
                    htmlFor='loginEmailInput'>
                    Email: </label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}

                    className='email'
                    required
                    placeholder='email@host.com'
                    id='loginEmailInput'
                />
            </div>
            <div className='input-group'>
                <label htmlFor='loginPasswordInput'>Password: </label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}

                    className="password"
                    required
                    id='loginPasswordInput'
                />
            </div>
            <br />
            <div className='password-visible'>
                <input
                    type="checkbox"
                    checked={isPasswordVisible}
                    onChange={(e) => {
                        setisPasswordVisible(e.target.checked);
                    }}
                    id="loginPasswordVisibleInput"
                />
                <label
                    className="show-password"
                    htmlFor="loginPasswordVisibleInput">
                    Show&nbsp;Password
                </label>
            </div>
            <div className={"login-failed " + (wasLoginFailed && 'visible')} >
                Your email or password was incorrect
            </div>
            {!isLoading
                ? (
                    <button className='button-green'
                        disabled={!formData.email || !formData.password}
                        type="submit"
                    >
                        Log In
                    </button>
                )
                : <div className="loader-spin-root">
                    <div className="circle">
                    </div>
                </div>}
        </form >


    )
}
