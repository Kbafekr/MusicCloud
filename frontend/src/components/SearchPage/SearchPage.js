import "./SearchPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImagesArray } from "../../images/Images";
import { backgroundImages } from "../../images/Images";
import { getAllSongs } from "../../store/songs";
import { getAllDemoSongs } from "../../store/songs";
import { getAllAlbums } from "../../store/albums";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { actionSongPlaying } from "../../store/audioPlayer";

//create default album if user has no albums
import { CreateAnAlbum } from "../../store/albums";

import PlayButtonImage from "../../images/PlayButton.png";

//to get data for splash page without logging in

export function SearchPage() {
  const history = useHistory();
  //get all songs
  const dispatch = useDispatch();
  const UserSignedIn = useSelector((state) => state.session.user);

  const { searchTerm } = useParams();

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);

  const albums = useSelector((state) => state.album);
  const AlbumsArray = Object.values(albums);

  let AlbumsFilter;
  let SongsFilter;

  //useEffect for getting Songs signed in
  useEffect(() => {
    if (UserSignedIn) {
      //get all songs
      dispatch(getAllSongs());
    }
  }, [dispatch, UserSignedIn, CreateAnAlbum, albums]);
  //useEffect for getting Songs signed in
  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch, UserSignedIn]);

  //   handlesubmit for search

  if (SongsArray.length > 45) {
    SongsFilter = SongsArray.filter((filteredSongs, index) =>
      filteredSongs.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    SongsFilter = "";
  }
  if (AlbumsArray.length > 45) {
    AlbumsFilter = AlbumsArray.filter((filteredSongs, index) =>
      filteredSongs.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    AlbumsFilter = "";
  }

  if (!UserSignedIn) {
    history.push("/");
  }

  if (UserSignedIn) {
    return (
      <div className="homePage">
        <h1>Search Results for {searchTerm}</h1>
        {/* search bar */}
        {/* songs */}
        <div className="headers">
          {/* search bar section */}
          <div className="searchBarContainer">
            <div
              className={
                SongsFilter.length ? "Filteredsong-container" : "HiddenResult"
              }
            >
                <div>Songs</div>

              {/* search return map */}
              <div className="FilteredSongsContainer">
                {SongsFilter &&
                  SongsFilter.map((song) => {
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
            <div
              className={
                !SongsFilter.length && searchTerm != ""
                  ? "errorHandlingSongSearch"
                  : "HiddenResult"
              }
            >
              No songs found
            </div>
          </div>
        </div>

        {/* albums */}
        <div className="headers">
          {/* search bar section */}
          <div className="searchBarContainer">
            <div
              className={
                AlbumsFilter.length ? "Filteredsong-container" : "HiddenResult"
              }
            >
                <div>Albums</div>
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {AlbumsFilter &&
                  AlbumsFilter.map((song) => {
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
            <div
              className={
                !AlbumsFilter.length && searchTerm != ""
                  ? "errorHandlingSongSearch"
                  : "HiddenResult"
              }
            >
              No albums found
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   if user isn't signed in
  else {
    return <></>;
  }
}
