import './LibraryPage.css'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ImagesArray} from '../../images/Images'
import LibraryGif from '../../images/LibraryGif.gif'

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
            <div className='homePage'>

                <div className='headers'>
                 <h1>Insert search bar for tracks and artists & signin button that redirects to songs page</h1>

                 <h1>Here's whats trending in the MusicCloud Community</h1>
                 <h2>add 'explore trending playlists' button</h2>

                 <h1>Thanks for listening. Now join in!</h1>
                 <h2>Save tracks, follow artists and build playlists. All for free.</h2>

                 <h3> create account button</h3>
                 <h4>already have an account? + sign in button</h4>

                 <h5>footer (include github link, modal for language selection, other bs)</h5>
                </div>
            </div>

        )
    }
}
