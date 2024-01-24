import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('1');
    const [emailError, setEmailError] = useState('');
    const [currentForm, setCurrentForm] = useState('login');
    const [registerSuccess, setRegisterSuccess] = useState(false);


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
                    console.log('Login successful', response);
                    navigate("/employee-management");
                } else {
                    console.log('Login failed', response);
                }
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        const data = {
            fullName: fullName,
            email: email,
            password: password,
            gender: gender
        };
        axios.post('http://localhost:5000/api/v1/auth/register', data)
            .then(response => {
                if (response.data.isSuccess === true) {
                    console.log('Successful registration:', response);
                    setRegisterSuccess(true);
                } else {
                    console.log('Register failed', response);
                }
            })

            .catch(error => {
                console.error('Registration error:', error);
            });
    };

    const userFormsClassName = currentForm === 'login' ? 'bounceRight' : 'bounceLeft';

    return (
        <section className="user">
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
                                        <input type="text" placeholder="Full Name" className="forms_field-input" required onChange={(e) => setFullName(e.target.value)} value={fullName} />
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
                                        <label htmlFor="gender">Gender</label>
                                        <select id="gender" className="forms_field-input" required onChange={(e) => setGender(e.target.value)}>
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <input type="submit" value="Sign up" className="forms_buttons-action" onClick={handleRegisterClick} />
                                </div>
                            </form>
                            {registerSuccess && <p className="success-message">Register successful!</p>}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Login;
