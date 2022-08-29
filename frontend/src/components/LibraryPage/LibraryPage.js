import './LibraryPage.css'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ImagesArray} from '../../images/Images'
import LibraryGif from '../../images/LibraryGif.gif'


import LoginAsDemo from "../LoginDemoUser";
import Whomp from "../../images/Whomp.webp";
import "../UnknownPage/PageNotFound.css";
import "../Navigation/Navigation.css";


export function LibraryPage() {
    const UserSignedIn = useSelector(state => state.session.user)

    if (UserSignedIn) {
        return (
            <div className='homePage'>
            <h1>Welcome to your library!</h1>
            <img className='libraryGif' src={LibraryGif} alt='abstract dj dog'/>
            <div className='NavLinksLibrary'>
            <NavLink className='mySongsLink' to={'/songs/current'}>
            My Songs
          </NavLink>
          <NavLink className='myAlbumsLink' to={'/albums/current'}>
            My Albums
          </NavLink>
            </div>
        </div>
        )
    }
    else {
        return (
            <div className="errorPage">
              <h1>Whomp Whomp!</h1>
              <div className="Whomps">
                <img className="whomp1" src={Whomp} alt="Whomp1" />
                <img className="whomp2" src={Whomp} alt="Whomp2" />
              </div>
              <div className="headers">
                <h2>Looks like you're an unauthorized user</h2>
                <div className="linkerror">
                  <h3>
                    Sign in as a Demo User Below:
                    <LoginAsDemo />
                  </h3>
                </div>
              </div>
            </div>
          );
        }
}
