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
        <div className="createAlbumForm">
          <CreateAlbumModal />
        </div>
        <div className="AllAlbumArray">
        {AlbumsArray &&
        AlbumsArray.map((album) => {
          return (
            <div className="AllalbumCard" key={album.id}>
              <div className="AllalbumId">Album Id: {album.id}</div>
              <img className="AllalbumImage" src={album.imageUrl}></img>
              <div className="AllalbumUserId">User: {album.userId}</div>
              <div className="AllalbumDescription">
                Description: {album.description}
              </div>

              <NavLink className="AllalbumsLink" to={`/albums/${album.id}`}>
                {album.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
    );
  }
}
