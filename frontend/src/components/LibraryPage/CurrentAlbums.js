import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CurrentSongs.css";
import LoginAsDemo from "../LoginDemoUser";

import "../UnknownPage/PageNotFound.css";
import "../Navigation/Navigation.css";

import { actionSongPlaying } from "../../store/audioPlayer";

import PlayButtonImage from "../../images/PlayButton.png";
import { getAllAlbums } from "../../store/albums";

export default function CurrentAlbums() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const albums = useSelector(state => state.album)
  const AlbumsArray = Object.values(albums)
  let AlbumsArrayCopy = [...AlbumsArray];

  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

 useEffect(() => {
    dispatch(getAllAlbums())
 }, [dispatch])


  let mySongsFilter = AlbumsArray.filter(
    (filteredSongs, index) => filteredSongs.userId == user.id
  );

  let mySongsFilter2 = AlbumsArray.filter(
    (filteredSongs, index) => filteredSongs.userId == user.id
  );

  let sortedAllSongsByNewest = AlbumsArrayCopy.sort((a, b) => b.id - a.id);
  let sortSongsinorder = mySongsFilter.sort((a, b) => a.id - b.id);

  let sortedSongsByNewest = mySongsFilter2.sort((a, b) => b.id - a.id);

  function AllYourSongs() {
    if (mySongsFilter.length > 0)
      return (
        <div className="TrendingSection">
          <h1>These are all of your albums</h1>
          <div
            className={
              sortedSongsByNewest.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {mySongsFilter &&
                mySongsFilter.map((song) => {
                  return (
                    <div className="TrendingsongCard" key={song.id}>
                      <img
                        className="TrendingsongImage"
                        src={song.imageUrl}
                      ></img>
                      <NavLink
                        className="TrendingsongLink"
                        to={`/albums/${song.id}`}
                      >
                        {song.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="TrendingSection">
          <h1>Looks like you don't have any albums</h1>
          <h2>Here are all of the albums on MusicCloud! </h2>
          <div
            className={
              AlbumsArray.length ? "Filteredsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {AlbumsArray &&
                AlbumsArray.map((song) => {
                  return (
                    <div className="TrendingsongCard" key={song.id}>

                      <img
                        className="TrendingsongImage"
                        src={song.imageUrl}
                      ></img>
                      <NavLink
                        className="TrendingsongLink"
                        to={`/albums/${song.id}`}
                      >
                        {song.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
  }
  function TrendingSongs() {
    if (sortedSongsByNewest.length > 0)
      return (
        <div className="TrendingSection">
          <h1>These are your most recent albums</h1>
          <div
            className={
              sortedSongsByNewest.length
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

                      <img
                        className="TrendingsongImage"
                        src={song.imageUrl}
                      ></img>
                      <NavLink
                        className="TrendingsongLink"
                        to={`/albums/${song.id}`}
                      >
                        {song.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="TrendingSection">
          <h1>Looks like you don't have any albums</h1>
          <h2>Here are the hottest albums on MusicCloud! </h2>
          <div
            className={
              sortedAllSongsByNewest.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {sortedAllSongsByNewest &&
                sortedAllSongsByNewest.map((song) => {
                  return (
                    <div className="TrendingsongCard" key={song.id}>

                      <img
                        className="TrendingsongImage"
                        src={song.imageUrl}
                      ></img>
                      <NavLink
                        className="TrendingsongLink"
                        to={`/albums/${song.id}`}
                      >
                        {song.title}
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
  }

  if (!user) {
    return (
      <div className="errorPage">
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
  if (user) {
    return (
      <div className="headers">
        {AllYourSongs()}
        {TrendingSongs()}
      </div>
    );
  }
}
