import "./LibraryPage.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LibraryGif from "../../images/LibraryGif.gif";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSongs } from "../../store/songs";
import { getAllAlbums } from "../../store/albums";
import { actionSongPlaying } from "../../store/audioPlayer";
import PlayButtonImage from "../../images/PlayButton.png";
import LoginAsDemo from "../LoginDemoUser";
import "../UnknownPage/PageNotFound.css";

export function LibraryPage() {
  const dispatch = useDispatch();
  const UserSignedIn = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  let SongsArrayCopy = [...SongsArray];


  const albums = useSelector((state) => state.album);
  const AlbumsArray = Object.values(albums);
  let AlbumsArrayCopy = [...AlbumsArray];

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAlbums());

  }, [dispatch]);

  let myAlbumsFilter = AlbumsArray.filter(
    (filteredSongs, index) => filteredSongs.userId == UserSignedIn.id
  );
  let mySongsFilter = SongsArray.filter(
    (filteredSongs, index) => filteredSongs.userId == UserSignedIn.id
  );

  let sortedAllSongsByNewest = SongsArrayCopy.sort((a, b) => b.id - a.id);
  let sortedAllAlbumsByNewest = AlbumsArrayCopy.sort((a, b) => b.id - a.id);


  let sortedSongsByNewest = mySongsFilter.sort((a, b) => b.id - a.id);
  let sortedAlbumsByNewest = myAlbumsFilter.sort((a, b) => b.id - a.id);

  function TrendingSongs() {
    if (sortedSongsByNewest.length > 0)
    return (
      <div className="TrendingSection">
        <h1>These are your most recent songs</h1>
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
    );
    else return (
      <div className="TrendingSection">
        <h1>Looks like you don't have any songs</h1>
        <h2>Here are the hottest songs on MusicCloud! </h2>
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
    );
  }
  function TrendingAlbums() {
    if (sortedAlbumsByNewest.length > 0)
    return (
      <div className="TrendingSection">
        <h1>These are your most recent albums</h1>
        <div
          className={
            sortedAlbumsByNewest.length
              ? "Filteredsong-container"
              : "HiddenResult"
          }
        >
          {/* search return map */}
          <div className="FilteredSongsContainer">
            {sortedAlbumsByNewest &&
              sortedAlbumsByNewest.map((song) => {
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
    else return (
      <div className="TrendingSection">
        <h1>Looks like you don't have any albums</h1>
        <h2>Here are the hottest albums on MusicCloud! </h2>
        <div
          className={
            sortedAllAlbumsByNewest.length
              ? "Filteredsong-container"
              : "HiddenResult"
          }
        >
          {/* search return map */}
          <div className="FilteredSongsContainer">
            {sortedAllAlbumsByNewest &&
              sortedAllAlbumsByNewest.map((song) => {
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





  if (UserSignedIn) {
    return (
      <div className="homePage">
        <h1>Welcome to your library {UserSignedIn.firstName}!</h1>
        <img className="libraryGif" src={LibraryGif} alt="abstract dj dog" />
        <div className="NavLinksLibrary">
          <NavLink className="mySongsLink" to={"/songs/current"}>
            My Songs
          </NavLink>
          <NavLink className="myAlbumsLink" to={"/albums/current"}>
            My Albums
          </NavLink>
        </div>

        <div className="headers">
        {TrendingSongs()}
        {TrendingAlbums()}
        </div>
      </div>
    );
  } else {
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
}
