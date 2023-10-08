import React from 'react'

// components
import SubmitBtn from "../submitBtn/SubmitBtn";

const SetupPage = () => {
  return (
    <div id='setupPage'>

    <div className='setupPageContent'>
        <div className='upperHeader'>
            <h1>Setup your <span style={{color: "#2064e3"}}>Datamoth</span> Organisation Structure</h1>
            <p>Make your organisation work as you want</p>
        </div>
        <div className="middleContent">
            <form className='registerForm'>
                <h1>Create an Project</h1>
                <div className="row">
                  <button>Create Project</button>        
                </div>
            </form>
        </div>
        <div className="lowerContent">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, saepe!</p>
            <SubmitBtn />
        </div>
    </div>
</div>
  )
}

export default SetupPage;

