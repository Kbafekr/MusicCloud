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

import { actionSongPlaying } from "../../store/audioPlayer";

import PlayButtonImage from "../../images/PlayButton.png";

//get all songs owned by current User, dispatch thunk action creator
export default function CurrentAlbums() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const albums = useSelector(state => state.album)
  const AlbumsArray = Object.values(albums)
  let AlbumsArrayCopy = [...AlbumsArray];

  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

 useEffect(() => {
    dispatch(UserAlbums())
 }, [dispatch])

 let sortedAlbumsByNewest = AlbumsArrayCopy.sort((a, b) => b.id - a.id);

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
    <div className="headers">
    <div className="TrendingSection">
      <h1>These are all of your albums</h1>
      <div
        className={
          AlbumsArray.length
            ? "Filteredsong-container"
            : "HiddenResult"
        }
      >
        {/* search return map */}
        <div className="FilteredSongsContainer">
          {AlbumsArray &&
            AlbumsArray.map((album) => {
              return (
                <div className="TrendingsongCard" key={album.id}>
                  <img
                    className="TrendingsongImage"
                    src={album.imageUrl}
                  ></img>
                  <NavLink
                    className="TrendingsongLink"
                    to={`/albums/${album.id}`}
                  >
                    {album.title}
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
      <div className="TrendingSection">
        <h1>These are your most recent albums</h1>
        <div
          className={
            AlbumsArrayCopy.length
              ? "Filteredsong-container"
              : "HiddenResult"
          }
        >
         {/* search return map */}
        <div className="FilteredSongsContainer">
          {AlbumsArrayCopy &&
            AlbumsArrayCopy.map((album) => {
              return (
                <div className="TrendingsongCard" key={album.id}>
                  <img
                    className="TrendingsongImage"
                    src={album.imageUrl}
                  ></img>
                  <NavLink
                    className="TrendingsongLink"
                    to={`/albums/${album.id}`}
                  >
                    {album.title}
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
      </div>
    </div>
  </div>
  );
}
}
