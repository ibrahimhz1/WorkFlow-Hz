import React from 'react'
import "./helpButton.css"

// Material Icon Imports
import HelpIcon from '@mui/icons-material/Help';

const HelpButton = () => {
    return (
        <button className="Btn">
            <div className="sign">
                <HelpIcon style={{width: '5vmax'}} />
            </div>
            <div className="text">HELP</div>
        </button>
    )
}

export default HelpButton