import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import http from '../../../services/api.service';
import './SignUpForm.css'

export default function SignUpForm({ onSignupSuccessful }) {

    const { login } = useContext(UserContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState(null);

    const [wasSignUpFailed, setWasSignUpFailed] = useState(false);

    useEffect(() => {
        clearTimeout(debounceTimer)
        setDebounceTimer(setTimeout(() => {
            checkEmailAvailability();
        }, 400));

    }, [formData.email])

    function handleFormSubmit(e) {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setWasSignUpFailed(true);
            return;
        }
        attemptSignUp();
    };

    function handleInputChange(e) {
        let { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    function checkEmailAvailability() {
        http.getUserByEmail(formData.email)
            .then(res => {
                setIsEmailTaken(true);
            }).catch(err => {
                console.log(err, err.response)
                if (err.response.status == 404) {
                    // no user found
                    console.log("no user found")
                    setIsEmailTaken(false);
                } else if (err.response.status == 401) {
                    // user exists
                    console.log("email taken")
                    setIsEmailTaken(true);
                } else {
                    console.error(err);
                }
            })
            .finally(() => {
                console.log("checked availability for ", formData.email)
            })
    }

    function attemptSignUp() {
        http.createUser(formData)
            .then(res => {
                // do something
                console.log(res.data)
                const user = res.data;

                login && login(user)
                onSignupSuccessful && onSignupSuccessful();
                navigate(`/myGarden`);
            }).catch(err => {
                console.error(err);
                setWasSignUpFailed(true);
            });
    }


    return (

        <form className='login-form'
            onSubmit={handleFormSubmit}>

            <div className='email input-group'>

                <label
                    htmlFor='signUpEmailInput'>
                    Email:
                </label>

                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}

                    className='email'
                    required
                    placeholder='email@host.com'
                    id='signUpEmailInput'
                />
                {wasSignUpFailed && <div>Email is {isEmailTaken && 'un'}available</div>}

            </div>

            <div className='input-group'>
                <label htmlFor='signUpPasswordInput'>Password: </label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}

                    className="password"
                    required
                    id='signUpPasswordInput'
                />
            </div>

            <div className='input-group'>
                <label htmlFor='signUpConfirmPasswordInput'>Confirm Password: </label>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}

                    className="password confirm"
                    required
                    id='signUpConfirmPasswordInput'
                />
            </div>

            <br />
            <div className='show-password'>
                <input
                    type="checkbox"
                    checked={isPasswordVisible}
                    onChange={(e) => {
                        setisPasswordVisible(e.target.checked);
                    }}
                    id="loginPasswordVisibleInput"
                />
                <label
                    htmlFor="loginPasswordVisibleInput" >
                    Show&nbsp;Password
                </label>
            </div>

            <div className={"signup-failed " + (formData.password !== formData.confirmPassword && 'visible')} >
                Your passwords do not match.
            </div>

            {
                !isLoading
                    ? (
                        <button
                            className='create-account'
                            disabled={!formData.email || !formData.password}
                            type="submit"
                        >
                            Create Account
                        </button>
                    )
                    : <div className="loader-spin-root">
                        <div className="circle">

                        </div>
                    </div>
            }

        </form >

    )
}
