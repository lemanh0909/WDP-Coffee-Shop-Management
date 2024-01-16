import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './login.css';

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('1');

    const handleSignupClick = () => {
        setIsLoginForm(false);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setIsLoginForm(true);
        const data = {
            email: email,
            password: password
        };
        axios.post('http://localhost:5000/api/v1/auth/login', data)
            .then(response => {
                if (response.data.isSuccess == true) {
                    console.log('Login successful', response);
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
        setIsLoginForm(true);
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            gender: gender
        };
        axios.post('http://localhost:5000/api/v1/auth/register', data)
            .then(response => {
                if (response.data.isSuccess == true) {
                    console.log('Successful registration:', response);
                } else {
                    console.log('Regiter failed', response);
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
            });
    };

    const userFormsClassName = isLoginForm ? 'bounceRight' : 'bounceLeft';

    return (
        <section className="user">
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account?</h2>
                        <p className="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer
                            whatever street art fap.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={handleSignupClick}>
                            Sign up
                        </button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer
                            whatever street art fap.</p>
                        <button className="user_registered-login" id="login-button" onClick={handleLoginClick}>
                            Login
                        </button>
                    </div>
                </div>

                <div className={`user_options-forms ${userFormsClassName}`} id="user_options-forms">
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
                    <div className="user_forms-signup">
                        <h2 className="forms_title">Sign Up</h2>
                        <form className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Full Name" className="forms_field-input" required onChange={(e) => setFullName(e.target.value)} value={fullName} />
                                </div>
                                <div className="forms_field">
                                    <input type="email" placeholder="Email" className="forms_field-input" required autoFocus onChange={(e) => setEmail(e.target.value)} value={email} />
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;