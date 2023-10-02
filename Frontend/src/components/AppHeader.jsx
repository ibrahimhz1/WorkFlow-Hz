import React from 'react'

// Material Icon Imports
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

const AppHeader = () => {
    return (
        <div id='AppHeader'>
            <div className='logoSection'>
                <span>AI Flow </span>
            </div>
            <div className='navItemsSection'>
                <div className='navItem'>Organization <ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /> </div>
                <div className='navItem'>Projects <ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem'>Filters <ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem'>Dashboards<ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem'>Teams <ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem'>Agenda<ArrowDropDownIcon style={{fontSize: '1.4vmax'}} /></div>
                <div className='navItem createBlue'>Create<AddIcon style={{fontSize: '1.4vmax'}} /></div>
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
                    <AccountCircleOutlinedIcon style={{fontSize: '1.4vmax'}}/>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;