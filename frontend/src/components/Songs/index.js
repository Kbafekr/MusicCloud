import React, { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./Songs.css";
import LoginAsDemo from "../LoginDemoUser";
import Whomp from "../../images/Whomp.webp";
import "../UnknownPage/PageNotFound.css";
import "../Navigation/Navigation.css";
import CreateSongModal from "./CreateSongIndex";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PlayButtonImage from "../../images/PlayButton.png";
//play song action
import { actionSongPlaying } from "../../store/audioPlayer";
//get all songs, dispatch thunk action creator
export default function ReturnAllSongs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  const SongsArrayCopy = [...SongsArray];
  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch, user]);

  let mySongsFilter = SongsArray.filter((filteredSongs, index) => filteredSongs.userId == user.id)
  let sortedByNewest = SongsArrayCopy.sort((a, b) => b.id - a.id);
  let workoutSongsFilter = SongsArray.filter((filteredSongs, index) => index == 1 || index == 2 || index == 10 || index == 11 || index == 17 || index == 18 ||
  index == 21 || index == 27 || index == 30 || index == 31 || index == 33 || index == 34 || index == 35 || index == 36 || index == 37 || index == 38 ||
  index == 45 || index == 46 || index == 47 || index == 48 )
  let hipHopSongsFilter = SongsArray.filter((filteredSongs, index) => index == 0 || index == 1 || index == 2 || index == 11 || index == 26 || index == 34 )
  //filter for j-rock songs
  let jRockSongsfilter = SongsArray.filter((filteredSongs, index) => index == 21 || index == 27 || index == 5 || index == 43 || index == 49)
  //filter for j-rock songs
  let remixSongsFilter = SongsArray.filter((filteredSongs, index) => index == 15 || index == 17 || index == 22 || index == 30 || index == 31 || index == 35 ||
  index == 37 || index == 46 || index == 12)

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
  if (!songs.Album && !songs.Artist) {
    return (
      <div className="Homesongs-container">
        <div className="createSongsContainer">
          <CreateSongModal className="createSongForm" />
        </div>
         {/* all 50 songs */}
        <div className="searchBarContainer">
          <h1>Browse all songs</h1>
          <p className="subheaderHomePage">
            All songs on MusicCloud
          </p>
          <div
            className={
              SongsArray.length ? "Filteredsong-container" : "HiddenResult"
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
        </div>
         {/* my songs */}
        <div className="searchBarContainer">
          <h1>Browse all your songs</h1>
          <p className="subheaderHomePage">
            All your songs on MusicCloud
          </p>
          <div
            className={
              mySongsFilter.length ? "Filteredsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {mySongsFilter &&
                mySongsFilter.map((song) => {
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
        {/* newest 50 songs */}
        <div className="searchBarContainer">
          <h1>Charts: New & hot</h1>
          <p className="subheaderHomePage">
            Up-and-coming tracks on MusicCloud
          </p>
          <div
            className={
              sortedByNewest.length ? "Filteredsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {sortedByNewest &&
                sortedByNewest.map((song) => {
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
         {/* workout playlist */}
         <div className="searchBarContainer">
            <h1>Workout</h1>
            <p className="subheaderHomePage">Songs for your exercise routine</p>
            <div
              className={
                workoutSongsFilter.length ? "Filteredsong-container" : "HiddenResult"
              } >
              {/* search return map */}
              <div className="FilteredSongsContainer">
              {workoutSongsFilter &&
                workoutSongsFilter.map((song) => {
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
           {/* Remix playlist */}
          <div className="searchBarContainer">
            <h1>Remixed Songs</h1>
            <p className="subheaderHomePage">Twists on Classic Songs</p>
            <div
              className={
                remixSongsFilter.length ? "Filteredsong-container" : "HiddenResult"
              } >
              {/* search return map */}
              <div className="FilteredSongsContainer">
              {remixSongsFilter &&
                remixSongsFilter.map((song) => {
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
           {/* k-Rock playlist */}
          <div className="searchBarContainer">
            <h1>J-Rock</h1>
            <p className="subheaderHomePage">The latest and hottest J-Rock Songs</p>
            <div
              className={
                jRockSongsfilter.length ? "Filteredsong-container" : "HiddenResult"
              } >
              {/* search return map */}
              <div className="FilteredSongsContainer">
              {jRockSongsfilter &&
                jRockSongsfilter.map((song) => {
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
          {/* hiphop playlist */}
          <div className="searchBarContainer">
            <h1>Hip-Hop</h1>
            <p className="subheaderHomePage">The latest and hottest Hip-Hop Songs</p>
            <div
              className={
                hipHopSongsFilter.length ? "Filteredsong-container" : "HiddenResult"
              } >
              {/* search return map */}
              <div className="FilteredSongsContainer">
              {hipHopSongsFilter &&
                hipHopSongsFilter.map((song) => {
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
    );
  }
}
