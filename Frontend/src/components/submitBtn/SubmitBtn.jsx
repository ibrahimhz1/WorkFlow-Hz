import React from 'react'
import "./submitBtn.css"

const SubmitBtn = ({onSubmitHandler, text}) => {
    return (
        <button value={"createUser"} id="submitBtn" onClick={()=>onSubmitHandler()}>
            {text}
        </button>
    )
}

export default SubmitBtn