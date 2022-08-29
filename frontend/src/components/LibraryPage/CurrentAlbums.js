import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,  } from 'react-router-dom';
import './CurrentAlbums.css'
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
    <div className="errorPage">
      <h1>Whomp Whomp!</h1>
      <div className="Whomps">
        <img className="whomp1" src={Whomp} alt="Whomp1" />
        <img className="whomp2" src={Whomp} alt="Whomp2" />
      </div>
      <div className="headers">
        <h2>Looks like you're an unauthorized user</h2>
        <div className="demoContainerHome">
          <h3 className="textforDemo">Sign in as a</h3>
          <div className="DemoUserHomePage">
            <LoginAsDemo id="DemoUserHomePage" />
          </div>
        </div>
      </div>
    </div>
  );
 }
 if (!albums.Artist && !albums.Songs) {
  return (
    <div className='current-albums-container'>
      <h1>My Albums</h1>
      {/* <div className='createSongForm'>

      </div> */}
      <div className="currentAlbumsArray"></div>
      {AlbumsArray.map((album) => {
        return (

          <div className="CurrentalbumsCard" key={album.id}>
          <img className='CurrentalbumImage' src={album.imageUrl}></img>
          <div className='CurrentAlbumuserId'>User: {album.userId}</div>
          <div className='albumDescription'>Description: {album.description}</div>

          <NavLink className='CurrentalbumLink' to={`/albums/${album.id}`}>{album.title}</NavLink>
      </div>
      )

})}

</div>
)
 }
}
