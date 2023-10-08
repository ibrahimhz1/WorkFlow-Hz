import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// components
import SubmitBtn from "../submitBtn/SubmitBtn";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';

// react redux
import { useSelector, useDispatch } from 'react-redux';

// action creators
import { loginAdmin } from "../../features/user/userSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    
    const onSubmitHandler = async() => {
        const response = await dispatch(loginAdmin({ email: email, password: password }));
        if(response){
            navigate('/app');
        }
    }

    return (
        <div id='loginPage'>

            <div className='registerPageContent'>
                <div className='upperHeader'>
                    <h1>Already an Member ?</h1>
                    <p>Login to your organisation</p>
                </div>
                <div className="middleContent">
                    <form className='registerForm' onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="left"><label><span>Username / Email Address</span> </label></div>
                            <div className="right">
                                <div className="emailGroup">
                                    <EmailIcon className='emailicon' style={{ color: 'gray' }} />
                                    <input
                                        className="emailInput"
                                        type="email"
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="left"><label><span>Password</span> </label></div>
                            <div className="right">
                                <div className="passwordGroup">
                                    <LockOpenIcon className='passwordicon' style={{ color: 'gray' }} />
                                    <input
                                        className="passwordInput"
                                        type="password"
                                        placeholder="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="lowerContent">
                    <p>"Unlock Your Project Journey !"</p>
                        <SubmitBtn text={"Login"} onSubmitHandler={onSubmitHandler} />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;