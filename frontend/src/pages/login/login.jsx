import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDoB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shopName, setShopName] = useState('');
    const [currentForm, setCurrentForm] = useState('login');
    const [phoneNumberError, setphoneNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return regex.test(email);
    };

    const handleSignupClick = () => {
        setCurrentForm('signup');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        axios.post('http://localhost:5000/api/v1/auth/login', data)
            .then(response => {
                if (response.data.isSuccess === true) {
                    toast.success("Login successfully!");

                    const userData = {
                        shopId: response.data.data.user.shopId,
                        userID: response.data.data.user._id,
                        email: response.data.data.user.email,
                        fullName: response.data.data.user.fullName,
                        role: response.data.data.user.role,
                        accessToken: response.data.data.accessToken,
                        refreshToken: response.data.data.refreshToken,
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));

                    setTimeout(() => {
                        if (userData.role === 'Admin') {
                            navigate("/adminManagement");
                        } else {
                            navigate("/control");
                        }
                    }, 800);
                } else {
                    toast.error("Please check your email or password or login permission!!");
                    console.log('Login failed', response);
                }
            })
            .catch(error => {
                console.error('Login error:', error);
            });

    };


    const handleRegisterClick = (e) => {
        e.preventDefault();

        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            setphoneNumberError('Phone number is invalid');
            return;
        } else {
            setphoneNumberError('')
        }

        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharactersRegex.test(fullName)) {
            setNameError('Full name cannot contain special characters');
            return;
        } else {
            setNameError('');
        }

       

        const data = {
            fullName: fullName,
            email: email,
            password: password,
            dob: dob,
            phoneNumber: phoneNumber,
            shopName: shopName
        };

        axios.post('http://localhost:5000/api/v1/auth/register', data)
            .then(response => {
                console.log(response)
                if (response.data.isSuccess === true) {
                    console.log('Successful registration:', response);
                    toast.success("Check email verify");
                } else {
                    console.log('Register failed', response);
                    if (response.data.message === "Email is already exist") {
                        setEmailError('Email already exists');
                    }
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
            });
    };


    const userFormsClassName = currentForm === 'login' ? 'bounceRight' : 'bounceLeft';

    return (
        <section className="user">
            <ToastContainer position='top-right' />
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account?</h2>
                        <p className="user_unregistered-text">Join us and explore a world of delicious coffee!</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={handleSignupClick}>
                            Sign up
                        </button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Welcome back! Login to enjoy our coffee selection and more.</p>
                        <button className="user_registered-login" id="login-button" onClick={() => setCurrentForm('login')}>
                            Login
                        </button>
                    </div>
                </div>

                <div className={`user_options-forms ${userFormsClassName}`} id="user_options-forms">
                    {currentForm === 'login' ? (
                        <div className="user_forms-login">
                            <h2 className="forms_title">Login</h2>
                            <form className="forms_form">
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input type="email" placeholder="Email" className="forms_field-input" required autoFocus onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </div>
                                    <div className="forms_field">
                                        <input type="password" placeholder="Password" className="forms_field-input" required onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <button type="button" className="forms_buttons-forgot">
                                        Forgot password?
                                    </button>
                                    <input
                                        type="submit"
                                        value="Log In"
                                        className="forms_buttons-action"
                                        onClick={handleLoginClick}
                                    />
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="user_forms-signup">
                            <h2 className="forms_title">Sign Up</h2>
                            <form className="forms_form">
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input type="text" placeholder="Full Name" className="forms_field-input" required autoFocus onChange={(e) => {
                                            setFullName(e.target.value);
                                            setNameError('');
                                        }} value={fullName} />
                                        {nameError && <p className="error-message">{nameError}</p>}
                                    </div>
                                    <div className="forms_field">
                                        <input type="email" placeholder="Email" className="forms_field-input" required autoFocus onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError('');
                                        }} value={email} />
                                        {emailError && <p className="error-message">{emailError}</p>}
                                    </div>
                                    <div className="forms_field">
                                        <input type="password" placeholder="Password" className="forms_field-input" required onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                    <div className="forms_field">
                                        <input type="date" id="dob" placeholder="DD/MM/YYYY" className="forms_field-input" required onChange={(e) => setDoB(e.target.value)} value={dob} />
                                    </div>
                                    <div className="forms_field">
                                        <input type="text" id="phoneNumber" placeholder="Phone Number" className="forms_field-input" required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                        {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                                    </div>
                                    <div className="forms_field">
                                        <input type="text" id="shopName" placeholder="Shop Name" className="forms_field-input" required onChange={(e) => setShopName(e.target.value)} value={shopName} />
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <input type="submit" value="Sign up" className="forms_buttons-action" onClick={handleRegisterClick} />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Login;
