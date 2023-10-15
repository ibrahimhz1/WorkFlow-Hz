import React from 'react'

// Material Icon Imports
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AccountBtn from './accountButton/AccountBtn';
import MenuItemProjects from './headerMenuItems/MenuItemProjects';
import MenuItemOrgs from './headerMenuItems/MenuItemOrgs'
import MenuItemTeams from './headerMenuItems/MenuItemTeams';
import MenuItemCreate from './headerMenuItems/MenuItemCreate';
import MenuItemUsers from './headerMenuItems/MenuItemUsers';

const AppHeader = () => {
    return (
        <div id='AppHeader'>
            <div className='logoSection'>
                <span>AI Flow </span>
            </div>
            <div className='navItemsSection'>
                <MenuItemOrgs />
                <MenuItemProjects />
                <div className='navItem'>Filters <ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem'>Dashboards<ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <MenuItemTeams />
                <MenuItemUsers />
                <MenuItemCreate />
            </div>
            <div className='searchBarSection'>
                <input type="text" placeholder='Search / '/>
                <SearchOutlinedIcon style={{fontSize: '1.4vmax'}}/>
            </div>
            <div className='userItemsDiv'>
                <div className='userItem'>
                    <NotificationsIcon style={{fontSize: '1.4vmax'}}/>
                </div>
                <div className='userItem'>
                    <HelpIcon style={{fontSize: '1.4vmax'}}/>
                </div>
                <div className='userItem'>
                    <SettingsIcon style={{fontSize: '1.4vmax'}}/>
                </div>
                <div className='userItem'>
                    {/* <AccountCircleOutlinedIcon style={{fontSize: '1.4vmax'}}/> */}
                    <AccountBtn />
                </div>
            </div>
        </div>
    )
}

export default AppHeader;