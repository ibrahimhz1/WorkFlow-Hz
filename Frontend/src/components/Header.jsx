import React from 'react'

import { Link } from "react-router-dom"

// components
import RegisterButton from "./registerButton/RegisterButton"
import LoginButton from "./loginButton/LoginButton"
import HelpButton from "./helpButton/HelpButton"

const Header = () => {
    return (
        <div id='Header'>
            <div className='logoSection'>
                <Link to="/" style={{textDecoration: 'none', color: "white"}}>
                    <span>AI Flow </span>
                </Link>
            </div>
            <div className='userItemsDiv'>
                <div className='userItem'>
                    <Link to="/login">
                        <LoginButton />
                    </Link>
                </div>
                <div className='userItem'>
                    <Link to="/registerApp">
                        <RegisterButton />
                    </Link>
                </div>
                <div className='userItem'>
                    <HelpButton />
                </div>
            </div>
        </div>
    )
}

export default Header;