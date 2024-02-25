import React, { useState } from 'react';
import loginImage from '/loginIcon.png'; // Import your image
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import '../styles/signup.css'; // Import your CSS file

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Your signup logic goes here
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='left-column'>
                    <h2 className='card-title'>Signup</h2>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='form-group'>
                            <label htmlFor='email' className='label'>Email:</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Enter Email...'
                                className='input'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password' className='label'>Password:</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Enter Password...'
                                    className='input'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className='eye-icon'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirmPassword' className='label'>Confirm Password:</label>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='confirmPassword'
                                    placeholder='Confirm Password...'
                                    className='input'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className='eye-icon'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='button'
                        >
                            Signup
                        </button>
                    </form>
                    <div className='signup-link'>
                        <p>Already have an account? <a href='/' className='signup'>Login</a></p>
                    </div>
                </div>
                <div className='right-column'>
                    <img
                        src={loginImage}
                        alt='Signup'
                        className='image'
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;
