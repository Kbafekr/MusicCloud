import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,  } from 'react-router-dom';
import CreateSongModal from './CreateSongIndex';
import './Songs.css'
import LoginAsDemo from '../LoginDemoUser';
import Whomp from '../../images/Whomp.webp'
import '../UnknownPage/PageNotFound.css'
import '../Navigation/Navigation.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//get all songs, dispatch thunk action creator
export default function ReturnAllSongs() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user.id)

  const songs = useSelector(state => state.song)
  const SongsArray = Object.values(songs)
  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

 useEffect(() => {
    dispatch(getAllSongs())
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
    <div className='songs-container'>
      <div className='createSongForm'>
        <CreateSongModal />
      </div>
      {SongsArray.map((song) => {
        return (

          <div className="songName" key={song.id}>
          <img className='songImage' src={song.imageUrl}></img>
          <div className='userId'>User: {song.userId}</div>
          <div className='albumId'>Album: {song.albumId}</div>

          <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>

          <AudioPlayer
             autoPlay={false}
             src={song.url}
             muted={true}
             onPlay={e => console.log("onPlay")}
          />
          </div>
      )

})}

</div>
)
}
