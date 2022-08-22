import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignUpModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className='SignupSide'>
        <LoginFormModal />
        <SignUpModal />
      </div>
      </>
    );
  }

  return (
    <div className='navBarStyle'>
      <NavLink exact to="/">
      <img src={require('./MusicCloudLogo.png')} alt='MusicCloud Logo'/>
      </NavLink>

      <div className='navBarRightSide'>
        {isLoaded && sessionLinks}
    </div>
    </div>
  );
}

export default Navigation;
