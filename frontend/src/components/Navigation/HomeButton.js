import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../Navigation/Navigation.css'
function HomeButton({ user }) {
  return (
    <>
    <div>
      <NavLink exact to="/">
      <button className='homeButton' addEvent>
      Home
      </button>
      </NavLink>
    </div>
    </>
  );
}

export default HomeButton;
