import React from 'react'
import { Link } from 'react-router-dom';

// mui components
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Paper from '@mui/material/Paper';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';import Accordion from '@mui/material/Accordion';

const OrgListComp = () => {
  return (
    <>
      <div className="rows">
        <h5>Your Organisation`s</h5>
        <div className="orgsDiv">

          <Paper className="orgCard">
            <h3>Datamoth</h3>
            <KeyboardArrowRightIcon />
          </Paper>

          <Paper className="orgCard">
            <h3>GenXtation</h3>
            <KeyboardArrowRightIcon />
          </Paper>

          <Paper className="orgCard">
            <h3>Xmonad</h3>
            <KeyboardArrowRightIcon />
          </Paper>

          <div>
            <p> <Link className='linkStyle' to="/orgs">View All <ArrowOutwardIcon style={{fontSize: '1.3vmax'}} /> </Link> </p>
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectListComp = () => {
  return (
    <>
      <div className="rows">
        <h5>Your Projects</h5>
        <div className="projectDiv">

          <Paper className="projectCard">
            <ViewInArIcon />
            <h4>Datamoth</h4>

          </Paper>

          <Paper className="projectCard">
            <ViewInArIcon />
            <h4>GenXtation</h4>
          </Paper>

          <Paper className="projectCard">
            <ViewInArIcon />
            <h4>Xmonad</h4>
          </Paper>
          
          <div>
            <p> <Link className='linkStyle' to="/orgs">View All  <ArrowOutwardIcon style={{fontSize: '1.3vmax'}} /> </Link> </p>
          </div>
        </div>
      </div>
    </>
  );
}

const Homepage = () => {
  return (
    <div id='homepageMain'>
      <div className="headSection">
        <h1>👋Hey Ibrahim'Hz</h1>
        <p>Now you can access all your projects and tasks from one place</p>
        <hr />
      </div>
      <div className="homeContent">
        <OrgListComp />
        <ProjectListComp />
        <hr />
      </div>
    </div>
  )
}

export default Homepage;