import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'


function ProfileButton({ user }) {
  // set image to local storage since it gets deleted off of render and doesn;t expire when exiting page

  // if (!localStorage.getItem('imageUrl')) {
  //   localStorage.setItem('imageUrl', user.user.imageUrl)
  // }

  // if (!localStorage.getItem('username')) {
  //   localStorage.setItem('username', user.user.username)
  // }

  // if (!localStorage.getItem('email')) {
  //   localStorage.setItem('email', user.user.email)
  // }

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
        {/* <img className='profileImg' src={localStorage.getItem('imageUrl')} /> */}
        {/* <img className='profileImg' src={user.imageUrl} /> */}

        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <div className="separatordropdown">username</div> */}
          {/* <li>{localStorage.getItem('username')}</li> */}
          <li>{user.username}</li>
          {/* <div className="separatordropdown">email</div> */}
          {/* <li>{localStorage.getItem('email')}</li> */}
          <li>{user.email}</li>

          <li>
            <button className='logoutButton' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
