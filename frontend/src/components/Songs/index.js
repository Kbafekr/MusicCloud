import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Songs.css'

//get all songs, dispatch thunk action creator
export default function returnAllSongs() {
  const dispatch = useDispatch()
  const songs = useSelector(state => state.song[songId])

 useEffect(() => {
    dispatch(getAllSongs())
 }, [dispatch])

  return (
    <div className='songs-container'>
        

    </div>
  );
}
