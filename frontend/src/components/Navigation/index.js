import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
//logged out imports
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignUpModal';
import LoginAsDemo from '../LoginDemoUser';
//sign in imports for navbar
import ProfileButton from './ProfileButton';
import SongButton from './SongButton';
import HomeButton from './HomeButton';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let memberLinks;

  if (sessionUser) {
   memberLinks = (
      <>
      <div className='memberLinks'>
      <HomeButton user={sessionUser} />
      <SongButton user={sessionUser} />
      </div>
      </>
    )

    sessionLinks = (
      <>
      <div className='SignInSide'>
      <ProfileButton user={sessionUser} />
      </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
      <div className='SignupSide'>
        <LoginFormModal />
        <SignUpModal />
        <LoginAsDemo />
      </div>
      </>
    );
  }

  return (
  <div className='navBarStyle'>
    <div className='navBarLeftSide'>
      <NavLink exact to="/">
      <img className='HomeLogo' src={require('./MusicCloudLogo.png')} alt='MusicCloud Logo'/>
      </NavLink>
      <div className='membershipContainer'>
      {memberLinks}
      </div>
    </div>

    <div className='navBarRightSide'>
        {isLoaded && sessionLinks}
    </div>
  </div>
  );
}

export default Navigation;
