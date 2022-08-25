import React, { useEffect, useState } from "react";
import { getOneSong } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./OneSong.css";

//import modal file create album index
import { Modal } from "../../context/Modal";
import EditSong from "./EditSongForm";
//exceeded rendering capacity with conditional rendering for nested properties
//just create modal in here

import EditSongModal from "./EditFormIndex";
import DeleteSongModal from "./DeleteFormIndex";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//get all songs, dispatch thunk action creator
export default function SongDetails() {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const song = useSelector((state) => state.song);
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch, showModal]);

  // }, [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

  if (!songId) {
    return <h1>Whomp Whomp</h1>;
  }
  if (song.Artist && song.Album) {
    return (
      <div className="song-details-container">
        {/* <div className='EditSongForm'>
        <EditSongModal />
      </div> */}
        <button className="EditSongForm" onClick={() => setShowModal(true)}>
          Edit Song
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSong setShowModal={setShowModal} />
          </Modal>
        )}
        <div className="DeleteSongModal">
          <DeleteSongModal />
        </div>
        <div className="song-container">
          <div className="songName">
            <img className="songImage" src={song.imageUrl}></img>
            <div className="songTitle">Song: {song.title}</div>
            <div className="description">Description: {song.description}</div>
            <AudioPlayer
              autoPlay={false}
              src={song.url}
              muted={true}
              onPlay={(e) => console.log("onPlay")}
            />
          </div>
          <div className="Album-container">
            <div className="albumId">Album # {song.Album.id}</div>
            <img className="albumImage" src={song.Album.imageUrl} />
            <NavLink className="albumLink" to={`/albums/${song.Album.id}`}>
              {song.Album.title}
            </NavLink>
          </div>
          <div className="Artist-container">
            <div className="artistId">Artist: {song.Artist.id}</div>
            <div className="artistUsername">
              Username: {song.Artist.username}
            </div>
            <img className="artistProfilePic" src={song.Artist.imageUrl} />
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="song-details-container">
        {/* <div className='EditSongForm'>
              <EditSongModal />
            </div> */}
        <button className="EditSongForm" onClick={() => setShowModal(true)}>
          Edit Song
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSong setShowModal={setShowModal} />
          </Modal>
        )}
        <div className="DeleteSongModal">
          <DeleteSongModal />
        </div>
        <div className="song-container">
          <div className="songName">
            <img className="songImage" src={song.imageUrl}></img>
            <div className="songTitle">Song: {song.title}</div>
            <div className="description">Description: {song.description}</div>
            <AudioPlayer
              autoPlay={false}
              src={song.url}
              muted={true}
              onPlay={(e) => console.log("onPlay")}
            />
          </div>
        </div>
      </div>
    );
}
