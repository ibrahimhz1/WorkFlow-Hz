import React from 'react'

const Dashboard = () => {
  return (
    <div id='dashboard'>
      <div className='topNavigation'>
        <span className="path">Organisation <span className="codeNum">#O-1</span></span> {">"}
        <span className="path"> Project <span className="codeNum">#P-101</span></span> {">"}
        <span className="path"> Task <span className="codeNum">#T-202</span></span> {">"}
      </div>
    </div>
  )
}

export default Dashboard