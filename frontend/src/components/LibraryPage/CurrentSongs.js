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

import { actionSongPlaying } from "../../store/audioPlayer";

import PlayButtonImage from "../../images/PlayButton.png";

//get all songs owned by current User, dispatch thunk action creator
export default function CurrentSongs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  let SongsArrayCopy = [...SongsArray];
  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

  useEffect(() => {
    dispatch(UserSongs());
  }, [dispatch]);

  let sortedSongsByNewest = SongsArrayCopy.sort((a, b) => b.id - a.id);

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
      <div className="headers">
      <div className="TrendingSection">
        <h1>These are all of your songs</h1>
        <div
          className={
            SongsArray.length
              ? "Filteredsong-container"
              : "HiddenResult"
          }
        >
          {/* search return map */}
          <div className="FilteredSongsContainer">
            {SongsArray &&
              SongsArray.map((song) => {
                return (
                  <div className="TrendingsongCard" key={song.id}>
                    <div className="PlayButtonContainer">
                      <img
                        className="PlayMe"
                        src={PlayButtonImage}
                        onClick={() => dispatch(actionSongPlaying(song))}
                      />
                    </div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <NavLink
                      className="TrendingsongLink"
                      to={`/songs/${song.id}`}
                    >
                      {song.title}
                    </NavLink>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="TrendingSection">
          <h1>These are your most recent songs</h1>
          <div
            className={
              SongsArray.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
           {/* search return map */}
          <div className="FilteredSongsContainer">
            {sortedSongsByNewest &&
              sortedSongsByNewest.map((song) => {
                return (
                  <div className="TrendingsongCard" key={song.id}>
                    <div className="PlayButtonContainer">
                      <img
                        className="PlayMe"
                        src={PlayButtonImage}
                        onClick={() => dispatch(actionSongPlaying(song))}
                      />
                    </div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <NavLink
                      className="TrendingsongLink"
                      to={`/songs/${song.id}`}
                    >
                      {song.title}
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
