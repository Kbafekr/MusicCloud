import React, { useEffect, useState } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./CurrentSongs.css";
import LoginAsDemo from "../LoginDemoUser";
import Whomp from "../../images/Whomp.webp";
import "../UnknownPage/PageNotFound.css";
import "../Navigation/Navigation.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { UserSongs } from "../../store/songs";

//get all songs owned by current User, dispatch thunk action creator
export default function CurrentSongs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);

  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

  useEffect(() => {
    dispatch(UserSongs());
  }, [dispatch]);

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
  if (!songs.Album && !songs.Artist) {
    return (
      <div className="songs-container">
        {/* <div className='createSongForm'>
      </div> */}
      <div className="currentSongsArray">

        {SongsArray.map((song) => {
           return (
              <div className="songCard" key={song.id}>
               <div className="songSongId">Song id: {song.id}</div>
                <img className="songImage" src={song.imageUrl}></img>
                <div className="songDescription">
                    Description: {song.description}
                  </div>
                  <div className="SonguserId">User: {song.userId}</div>
                <div className="SongalbumId">Album: {song.albumId}</div>

                <NavLink className="songLink" to={`/songs/${song.id}`}>
                  {song.title}
                </NavLink>

                <AudioPlayer
                  autoPlay={false}
                  muted={true}
                  src={song.url}
                  onPlay={(e) => console.log("onPlay")}
                  />
              </div>
          );
         })}
         </div>
      </div>
    );
  }
}
