import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../Navigation/Navigation.css'
function LibraryButton({ user }) {
  return (
    <>
    <div>
      <NavLink exact to="/library">
      <button className='libraryButton'>
      Library
      </button>
      </NavLink>
    </div>
    </>
  );
}

export default LibraryButton;
