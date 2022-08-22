import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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
        <NavLink to="/signup">
        <button type="submit">Create account</button>
        </NavLink>
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
