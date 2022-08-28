import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//logged out imports
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import LoginAsDemo from "../LoginDemoUser";
//sign in imports for navbar
import ProfileButton from "./ProfileButton";
import SongButton from "./SongButton";
import HomeButton from "./HomeButton";
import LibraryButton from "./LibraryButton";
import AlbumButton from "./AlbumButton";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  let memberLinks;

  if (sessionUser) {
    memberLinks = (
      <>
        <div className="memberLinks">
          <HomeButton user={sessionUser} />
          <LibraryButton user={sessionUser} />
          <SongButton user={sessionUser} />
          <AlbumButton user={sessionUser} />
        </div>
      </>
    );

    sessionLinks = (
      <>
        <div className="SignInSide">
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="SignupSide">
          <LoginFormModal />
          <SignUpModal />
          <LoginAsDemo />
        </div>
      </>
    );
  }

  return (
    <div className="NavBarContainer">
      <div className="LogoSide">
        <NavLink exact to="/">
          <img
            className="LogoNav"
            src={require("./MusicCloudLogo.png")}
            alt="MusicCloud Logo"
          />
        </NavLink>
      </div>
      <div className="navBarLeftSide">{memberLinks}</div>
      <div className="navBarRightSide">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
