import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,  } from 'react-router-dom';
import './CurrentSongs.css'
import LoginAsDemo from '../LoginDemoUser';
import Whomp from '../../images/Whomp.webp'
import '../UnknownPage/PageNotFound.css'
import '../Navigation/Navigation.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { UserAlbums } from '../../store/albums';

//get all songs owned by current User, dispatch thunk action creator
export default function CurrentAlbums() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const albums = useSelector(state => state.album)
  const AlbumsArray = Object.values(albums)

  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

 useEffect(() => {
    dispatch(UserAlbums())
 }, [dispatch])

 if (!user) {
  return (
    <div className='errorPage'>
    <h1>Whomp Whomp!</h1>
    <div className='Whomps'>
     <img className='whomp1' src={Whomp} alt='Whomp1'/>
     <img className='whomp2' src={Whomp} alt='Whomp2'/>
    </div>
    <div className='headers'>
     <h2>Looks like you're an unauthorized user</h2>
        <div className='linkerror'>
     <h3>Please sign in as a Demo User:<LoginAsDemo />
     </h3>
        </div>
    </div>
</div>
)
 }
  return (
    <div className='albums-container'>
      {/* <div className='createSongForm'>

      </div> */}
      {AlbumsArray.map((album) => {
        return (

          <div className="albumKey" key={album.id}>
          <img className='albumImage' src={album.imageUrl}></img>
          <div className='userId'>User: {album.userId}</div>
          <div className='albumDescription'>Description: {album.description}</div>

          <NavLink className='albumLink' to={`/albums/${album.id}`}>{album.title}</NavLink>
      </div>
      )

})}

</div>
)
}
