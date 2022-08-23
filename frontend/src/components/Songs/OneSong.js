import React, { useEffect, useState } from 'react';
import { getOneSong } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useParams,  } from 'react-router-dom';
import './Songs.css'

//get all songs, dispatch thunk action creator
export default function SongDetails() {
  const dispatch = useDispatch()
  const {songId} = useParams()

  const songs = useSelector(state => state.song)
  const SongsArray = Object.values(songs)
  const song = SongsArray[songId - 1]


 useEffect(() => {
    dispatch(getOneSong(songId))
 }, [dispatch])

  return (
    <div className='songs-container'>

          <div className="songName" key={song.title}>
          <div className='albumId'>Album: {song.albumId}</div>
          <img className='songImage' src={song.imageUrl}></img>
          <div className='artistId'>Artist: {song.title}</div>
          <div className='description'>Description: {song.description}</div>

          <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>

          <audio className='song-player-general' src={song.url}>Play Me</audio>
          </div>
</div>
)
}
