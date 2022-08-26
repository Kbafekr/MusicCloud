import React, { useState, useEffect } from "react";
import { getOneAlbum } from "../../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./OneAlbum.css";
import Whomp from '../../../images/Whomp.webp'
import LoginAsDemo from "../../LoginDemoUser";
import '../../UnknownPage/PageNotFound.css'
// import EditAlbumModal from "./EditAlbumIndex";

//import modal file create album index
import { Modal } from "../../../context/Modal";
import EditAlbum from "./EditAlbumForm";
//exceeded rendering capacity with conditional rendering for nested properties
//just create modal in here

import DeleteAlbumModal from "./DeleteAlbumIndex";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//get one album, dispatch thunk action creator
export default function AlbumDetails() {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const album = useSelector((state) => state.album);
  const user = useSelector((state) => state.session.user)
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneAlbum(albumId));
  }, [dispatch, showModal, user]);
  // dispatch, album.Artist, album.Songs]);
  //  [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

  if (!albumId) {
    return <h1>Whomp Whomp</h1>;
  }

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

  if (album.Artist && album.Songs) {
    return (
      <div className="album-details-container">
        <button className="EditAlbumButton" onClick={() => setShowModal(true)}>
          Edit Album
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditAlbum setShowModal={setShowModal} />
          </Modal>
        )}

        <div className="DeleteAlbumModal">
          <DeleteAlbumModal />
        </div>
        <div className="album-container">
          <div className="albumKey">
            <div className="albumTitle">Album: {album.title}</div>
            <img className="albumImage" src={album.imageUrl}></img>
            <div className="albumDescription">
              Description: {album.description}
            </div>
          </div>
        </div>

        <div className="Artist-container">
          <div key={album.Artist.id} className="artistId">
            Artist: {album.userId}
          </div>
          <div className="artistUsername">
            Artist Username: {album.Artist.username}
          </div>
          <img className="artistProfilePic" src={album.Artist.imageUrl} />
        </div>

        <div className="Songs-container">
          {album.Songs.map((song) => {
            return (
              <div key={song.id} className="song">
                <NavLink className="songLink" to={`/songs/${song.id}`}>
                  {song.title}
                </NavLink>
                <img className="songImage" src={song.imageUrl} />
                <div className="songDescription">
                  Song Description: {song.description}
                </div>

                <div className="audioPlayer">
                  <AudioPlayer
                    autoPlay={false}
                    src={song.url}
                    onPlay={(e) => console.log("onPlay")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else
    return (
      <div className="album-details-container">
        <button className="EditAlbumButton" onClick={() => setShowModal(true)}>
          Edit Album
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditAlbum setShowModal={setShowModal} />
          </Modal>
        )}
        <div className="DeleteAlbumModal">
          <DeleteAlbumModal />
        </div>
        <div className="album-container">
          <div className="albumKey" key={albumId}>
            <div className="albumTitle">{album.title}</div>
            <img className="albumImage" src={album.imageUrl}></img>
            <div className="albumDescription">
              Description: {album.description}
            </div>
          </div>
        </div>
      </div>
    );
}
