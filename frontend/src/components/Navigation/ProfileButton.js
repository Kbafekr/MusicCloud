import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'


function ProfileButton({ user }) {
  //set image to session storage since it gets deleted off of render
  if (!sessionStorage.getItem('imageUrl')) {
    sessionStorage.setItem('imageUrl', user.user.imageUrl)
  }

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <>
      <button onClick={openMenu}>
        <img className='profileImg' src={sessionStorage.getItem('imageUrl')} />
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="separatordropdown">username</div>
          <li>{user.user.username}</li>
          <div className="separatordropdown">email</div>
          <li>{user.user.email}</li>
          <li>
            <button className='logoutButton' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
