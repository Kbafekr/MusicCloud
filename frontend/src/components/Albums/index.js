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
          <div className="linkerror">
            <h3>
              Please sign in as a Demo User:
              <LoginAsDemo />
            </h3>
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

        {AlbumsArray.map((album) => {
          return (
            <div className="albumCard" key={album.id}>
              <div className="albumId">Album Id: {album.id}</div>
              <img className="albumImage" src={album.imageUrl}></img>
              <div className="userId">User: {album.userId}</div>
              <div className="albumDescription">
                Description: {album.description}
              </div>

              <NavLink className="albumLink" to={`/albums/${album.id}`}>
                {album.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}
