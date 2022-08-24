import React, { useEffect, useState } from 'react';
import { getOneSong } from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useParams,  } from 'react-router-dom';
import './OneSong.css'
import EditSongModal from './EditFormIndex';
import DeleteSongModal from './DeleteFormIndex';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//get all songs, dispatch thunk action creator
export default function SongDetails() {
  const dispatch = useDispatch()
  const {songId} = useParams()

  const song = useSelector(state => state.song)
//   console.log(song)
//   const Albumvalues = Object.values(song.Album)
//   console.log(Albumvalues)
//   const Artist = useSelector(state => state.song.Artist)



 useEffect(() => {
    dispatch(getOneSong(songId))
 }, [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])


 if(!song.id) {
return (<h1>Whomp Whomp</h1>)
 }
  return (
    <div className='song-details-container'>
      <div className='EditSongForm'>
        <EditSongModal />
      </div>
      <div className='DeleteSongModal'>
        <DeleteSongModal />
      </div>
        <div className='song-container'>
          <div className="songName" key={songId}>
          <img className='songImage' src={song.imageUrl}></img>
          <div className='songTitle'>Song: {song.title}</div>
          <div className='description'>Description: {song.description}</div>
          <AudioPlayer
             autoPlay={false}
              src={song.url}
               onPlay={e => console.log("onPlay")}
          />
        </div>
        <div className='Album-container'>
        <div className='albumId'>Album # {song.AlbumId}</div>
        <img className='albumImage' src={song.AlbumImageUrl} />
          <div className='albumTitle'>Album: {song.AlbumTitle}</div>
        </div>
         <div className='Artist-container'>
          <div className='artistId'>Artist: {song.ArtistId}</div>
          <div className='artistUsername'>Username: {song.ArtistUsername}</div>
          <img className='artistProfilePic' src={song.ArtistProfilePic} />
        </div>
          </div>
    </div>
)
}
