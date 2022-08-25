import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../Navigation/Navigation.css'
function AlbumButton({ user }) {
  return (
    <>
    <div>
      <NavLink exact to="/albums">
      <button className='albumButton'>
      Albums
      </button>
      </NavLink>
    </div>
    </>
  );
}

export default AlbumButton;
