import "./LibraryPage.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LibraryGif from "../../images/LibraryGif.gif";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserSongs } from "../../store/songs";
import { UserAlbums } from "../../store/albums";
import { actionSongPlaying } from "../../store/audioPlayer";

import PlayButtonImage from "../../images/PlayButton.png";
import LoginAsDemo from "../LoginDemoUser";
import Whomp from "../../images/Whomp.webp";
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
    dispatch(UserSongs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(UserAlbums());
  }, [dispatch]);

  let sortedSongsByNewest = SongsArrayCopy.sort((a, b) => b.id - a.id);
  let sortedAlbumsByNewest = AlbumsArrayCopy.sort((a, b) => b.id - a.id);

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
                    sortedAlbumsByNewest.map((album) => {
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
      </div>
    );
  } else {
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
}
