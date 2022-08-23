import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,  } from 'react-router-dom';
import './Songs.css'

//get all songs, dispatch thunk action creator
export default function ReturnAllSongs() {
  const dispatch = useDispatch()
  const songs = useSelector(state => state.song)
  const SongsArray = Object.values(songs)
  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

 useEffect(() => {
    dispatch(getAllSongs())
 }, [dispatch])

  return (
    <div className='songs-container'>
      {SongsArray.map((song) => {
        return (

          <div className="songName" key={song.id}>
          <div className='albumId'>Album: {song.albumId}</div>
          <img className='songImage' src={song.imageUrl}></img>

          <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>

          <audio className='song-player-general' src={song.url}>Play Me</audio>
          </div>
      )

})}

</div>
)
}
