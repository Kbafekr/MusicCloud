import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../Navigation/Navigation.css'
function SongButton({ user }) {
  return (
    <>
    <div>
      <NavLink exact to="/songs">
      <button className='songButton'>
      Songs
      </button>
      </NavLink>
    </div>
    </>
  );
}

export default SongButton;
