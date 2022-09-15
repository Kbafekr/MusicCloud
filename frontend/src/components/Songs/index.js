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

//get all songs, dispatch thunk action creator
export default function ReturnAllSongs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  // console.log('this is songsarray' + SongsArray)
  // console.log('this is songs' + Object.values(songs))

  useEffect(() => {
    dispatch(getAllSongs());
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
  if (!songs.Album && !songs.Artist) {
    return (
      <div className="Homesongs-container">
        <div>
          <CreateSongModal className="createSongForm" />
        </div>
        <div className="AllSongArray">
          {SongsArray &&
            SongsArray.map((song) => {
              return (
                <div className="songCardHome" key={song.id}>
                  <div className="topHalfHomeSongsCard">
                    <div className="songSongIdHome">Song id: {song.id}</div>
                    <img className="songImageHome" src={song.imageUrl}></img>
                    <div className="songDescriptionHome">
                      Description: {song.description}
                    </div>
                    <div className="SonguserIdHome">User: {song.userId}</div>
                    <div className="SongalbumIdHome">Album: {song.albumId}</div>
                  </div>
                  <div className="songLinkContainerHome">
                    <NavLink className="songLinkHome" to={`/songs/${song.id}`}>
                      {song.title}
                    </NavLink>
                  </div>
                      <AudioPlayer
                        autoPlay={false}
                        src={song.url}
                        // muted={true}
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
