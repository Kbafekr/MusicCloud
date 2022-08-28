import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css";
import "./Navigation.css";
import icon1 from '../../images/icons/icon1.png'
import icon2 from '../../images/icons/icon2.png'
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <>
    <div className="container">

      <button className="profileButton" onClick={openMenu}>
        {/* <img className='profileImg' src={localStorage.getItem('imageUrl')} /> */}
        <img className="profileImg" src={user.imageUrl} alt="profilepic" />
        <i className="fas fa-user-circle" />
      </button>
  
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="separatordropdown">username</div>
          {/* <li>{localStorage.getItem('username')}</li> */}
          <li>{user.username}</li>
          <div className="separatordropdown">email</div>
          {/* <li>{localStorage.getItem('email')}</li> */}
          <li>{user.email}</li>

          <li>
            <div className="mySongs">
            <NavLink to={"/songs/current"}>
              <img className='icon' src={icon1} alt="songs icon"/>
              </NavLink>
              <NavLink className="mySongsText" to={'/songs/current'}>
                My Songs
              </NavLink>
            </div>
          </li>

          <li>
            <div className="myAlbums">
            <NavLink to={"/albums/current"}>
              <img className='icon' src={icon2} alt="albums icon"/>
              </NavLink>

              <NavLink className="myAlbumsText" to={"/albums/current"}>
                My Albums
              </NavLink>
            </div>
          </li>

          <li>
            <button className="logoutButton" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
