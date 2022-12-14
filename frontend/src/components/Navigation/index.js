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
import { SearchBar } from "./SearchBar";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let signedIn;

  let sessionLinks;
  let memberLinks;

  if (sessionUser) {
    signedIn = true;
    memberLinks = (
      <>
        <div className="memberLinks">
          <div className="HomeNavButton">
            <HomeButton user={sessionUser} />
          </div>
          <div className="NavButtons">
            <LibraryButton user={sessionUser} />
          </div>
          <div className="NavButtons">
            <SongButton user={sessionUser} />
          </div>
          <div className="AlbumNavButton">
            <AlbumButton user={sessionUser} />
          </div>
          <SearchBar />
          {/* search bar */}
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
    signedIn = false;
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
    <div
      className="NavBarContainer"
      id={signedIn ? "signedInNavigation" : "NavBar"}
    >
      <div className="LogoSide">
        <NavLink className="LogoNav" exact to="/">
          <img
            className="imgLogo"
            src={require("./MusicCloudLogo.png")}
            alt="MusicCloud Logo"
          />
        </NavLink>
      </div>
      <div
        className="navBarLeftSide"
        id={signedIn ? "leftSideSignedIn" : "leftSideSignedOut"}
      >
        {memberLinks}
      </div>
      <div
        className="navBarRightSide"
        id={signedIn ? "rightSideSignedIn" : "rightSideSignedOut"}
      >
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
