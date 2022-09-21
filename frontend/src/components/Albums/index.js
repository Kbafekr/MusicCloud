import React, { useEffect } from "react";
import { getAllAlbums } from "../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./Albums.css";
import LoginAsDemo from "../LoginDemoUser";
import Whomp from "../../images/Whomp.webp";
import "../UnknownPage/PageNotFound.css";
import "../Navigation/Navigation.css";
import CreateAlbumModal from "./AlbumDetails/CreateAlbumIndex";

//get all albums, dispatch thunk action creator
export default function ReturnAllAlbums() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const albums = useSelector((state) => state.album);
  const AlbumsArray = Object.values(albums);
  // console.log('this is albumsArray' + AlbumsArray)
  // console.log('this are albums' + Object.values(albums))
  let AlbumsArrayCopy = [...AlbumsArray];

  let sortedAlbumsByNewest = AlbumsArrayCopy.sort((a, b) => b.id - a.id);

  let myAlbumsFilter = AlbumsArray.filter(
    (filteredSongs, index) => filteredSongs.userId == user.id
  );
  let workoutAlbumsFilter = AlbumsArray.filter(
    (filteredSongs, index) =>
      index == 1 ||
      index == 2 ||
      index == 10 ||
      index == 11 ||
      index == 17 ||
      index == 18 ||
      index == 21 ||
      index == 27 ||
      index == 30 ||
      index == 31 ||
      index == 33 ||
      index == 34 ||
      index == 35 ||
      index == 36 ||
      index == 37 ||
      index == 38 ||
      index == 45 ||
      index == 46 ||
      index == 47
  );
  let hipHopAlbumsFilter = AlbumsArray.filter(
    (filteredSongs, index) =>
      index == 0 ||
      index == 1 ||
      index == 2 ||
      index == 11 ||
      index == 26 ||
      index == 34
  );
  //filter for j-rock songs
  let jRockAlbumsfilter = AlbumsArray.filter(
    (filteredSongs, index) =>
      index == 21 || index == 27 || index == 5
  );
  //filter for remix songs
  let remixAlbumsFilter = AlbumsArray.filter(
    (filteredSongs, index) =>
      index == 15 ||
      index == 17 ||
      index == 22 ||
      index == 30 ||
      index == 31 ||
      index == 35 ||
      index == 37 ||
      index == 12
  );

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch, user]);

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
      <div className="albums-container">
        <div className="createSongsContainer">
          <CreateAlbumModal className="createSongForm"/>
        </div>
        {/* all 50 albums */}
        <div className="searchBarContainer">
          <h1>Browse all Albums</h1>
          <p className="subheaderHomePage">All albums on MusicCloud</p>
          <div
            className={
              AlbumsArray.length ? "Filteredsong-container" : "HiddenResult"
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
        </div>
        {/* my albums */}
        <div className="searchBarContainer">
          <h1>Browse all your Albums</h1>
          <p className="subheaderHomePage">All your albums on MusicCloud</p>
          <div
            className={
              myAlbumsFilter.length ? "Filteredsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {myAlbumsFilter &&
                myAlbumsFilter.map((album) => {
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
        {/* newest 50 songs */}
        <div className="searchBarContainer">
          <h1>Charts: New & hot</h1>
          <p className="subheaderHomePage">
            Up-and-coming albums on MusicCloud
          </p>
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

        {/* workout playlist */}
        <div className="searchBarContainer">
          <h1>Workout</h1>
          <p className="subheaderHomePage">Albums for your exercise routine</p>
          <div
            className={
              workoutAlbumsFilter.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {workoutAlbumsFilter &&
                workoutAlbumsFilter.map((album) => {
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
        {/* Remix playlist */}
        <div className="searchBarContainer">
          <h1>Remixed Albums</h1>
          <p className="subheaderHomePage">Twists on Classics</p>
          <div
            className={
              remixAlbumsFilter.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {remixAlbumsFilter &&
                remixAlbumsFilter.map((album) => {
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
        {/* k-Rock playlist */}
        <div className="searchBarContainer">
          <h1>J-Rock</h1>
          <p className="subheaderHomePage">
            The latest and hottest J-Rock Albums
          </p>
          <div
            className={
              jRockAlbumsfilter.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {jRockAlbumsfilter &&
                jRockAlbumsfilter.map((album) => {
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
        {/* hiphop playlist */}
        <div className="searchBarContainer">
          <h1>Hip-Hop</h1>
          <p className="subheaderHomePage">
            The latest and hottest Hip-Hop Albums
          </p>
          <div
            className={
              hipHopAlbumsFilter.length
                ? "Filteredsong-container"
                : "HiddenResult"
            }
          >
            {/* search return map */}
            <div className="FilteredSongsContainer">
              {hipHopAlbumsFilter &&
                hipHopAlbumsFilter.map((album) => {
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
    );
  }
}
