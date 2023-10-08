import React, { useState } from 'react'

// components
import DropDownButton from "../dropDownButton/DropdownButton"
import SubmitBtn from "../submitBtn/SubmitBtn";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// action creators
import { registerAdmin } from "../../features/user/userSlice"

const RegisterPage = () => {
  const [adminId, setAdminId] = useState('');
  const [role, setRole] = useState("admin");
  const [adminName, setAdminName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [orgName, setOrgName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const response = await dispatch(registerAdmin({
      adminId,
      name: adminName,
      username,
      email,
      password,
      avatar: {
        public_id: "image_public_id",
        url: "profile_url"
      },
      role: role
    }));

    if (response) {
      console.log(response);
      navigate('/login');
    }
  }

  return (
    <div id='registerPage'>
      <div className='registerPageContent'>
        <div className='upperHeader'>
          <h1>Create a new environment</h1>
          <p>Register an new environment for your organisations</p>
        </div>
        <div className="middleContent">
          <form className='registerForm' onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="left"><label><span>Admin / Founder - Id : </span> </label></div>
              <div className="right">
                <input className="inputbox" placeholder="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className='left'>
                <label><DropDownButton role={role} setRole={setRole} /> <span>Name</span> </label>
              </div>
              <div className='right'>
                <input className="inputbox" placeholder="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="left"><label><span>Username</span> </label></div>
              <div className="right">
                <input className="inputbox" placeholder="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="left"><label><span>Email Address</span> </label></div>
              <div className="right">
                <div className="emailGroup">
                  <EmailIcon className='emailicon' style={{ color: 'gray' }} />
                  <input className="emailInput" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="left"><label><span>Password</span> </label></div>
              <div className="right">
                <div className="passwordGroup">
                  <LockOpenIcon className='passwordicon' style={{ color: 'gray' }} />
                  <input className="passwordInput" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="left"><label><span>Confirm Password</span> </label></div>
              <div className="right">
                <div className="passwordGroup">
                  <LockOpenIcon className='passwordicon' style={{ color: 'gray' }} />
                  <input className="passwordInput" type="password" placeholder="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="left"><label><span>Organisation Name</span> </label></div>
              <div className="right">
                <input className="inputbox" placeholder="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
            </div>
          </form>
        </div>
        <div className="lowerContent">
          <p>"Start Your Project Journey !"</p>
          <SubmitBtn onSubmitHandler={onSubmitHandler} text={"Create"} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;