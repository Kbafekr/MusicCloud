import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import "./OneSong.css";
import Whomp from "../../images/Whomp.webp";
import LoginAsDemo from "../LoginDemoUser";
import "../UnknownPage/PageNotFound.css";

//import modal file create album index
import { Modal } from "../../context/Modal";
import EditSong from "./EditSongForm";
//exceeded rendering capacity with conditional rendering for nested properties
//just create modal in here

//create modal for delete
// import DeleteSongModal from "./DeleteFormIndex";
import DeleteSong from "./DeleteSongForm";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//get all songs, dispatch thunk action creator
export default function SongDetails() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const song = useSelector((state) => state.song);
  const user = useSelector((state) => state.session.user);
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch, showModal, user, modalDelete]);

  // }, [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

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

  if (!song.id) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <div className="errorPage">
          <h1>Whomp Whomp!</h1>
          <div className="Whomps">
            <img className="whomp1" src={Whomp} alt="Whomp1" />
            <img className="whomp2" src={Whomp} alt="Whomp2" />
          </div>
          <div className="headers">
            <h2>Looks like this song doesn't exist</h2>
            <div className="linkerror">
              <NavLink to="/" className="ErrorhomeLink">
                Click here to go home
              </NavLink>
              <NavLink to="/songs" className="ErrorsongsLink">
                Click here to go back to all songs
              </NavLink>
              <NavLink to="/songs/current" className="ErrorownedLink">
                Click here to go back to owned songs
              </NavLink>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }
  if (song.Artist && song.Album) {
    return (
      <div className="song-details-container">
        <div className="buttonsEditAndDeleteSong">
          <button className="EditSongForm" onClick={() => setShowModal(true)}>
            Edit Song
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditSong setShowModal={setShowModal} />
            </Modal>
          )}
          <button
            className="DeleteSongButton"
            onClick={() => setModalDelete(true)}
          >
            Delete Song
          </button>
          {modalDelete && (
            <Modal onClose={() => setModalDelete(false)}>
              <DeleteSong setModalDelete={setModalDelete} />
            </Modal>
          )}
        </div>
        <div className="Onesong-container">
          {/* song */}
          <div className="SinglesongCard">
            <div className="songName">
              <img className="OnesongImage" src={song.imageUrl}></img>
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
          {/* album */}
          <div className="Song-Album-container">
            <div className="Song-Album-Card">
              <div className="OneSongalbumId">Album # {song.Album.id}</div>
              <img className="OnealbumImage" src={song.Album.imageUrl} />
              <NavLink className="OneSongalbumLink" to={`/albums/${song.Album.id}`}>
                {song.Album.title}
              </NavLink>
            </div>
          </div>
          {/* artist */}
          <div className="Song-Artist-container">
          <div className="Song-Artist-Card">
            <div className="OneSongartistId">Artist: {song.Artist.id}</div>
            <div className="OneSongartistUsername">
              Username: {song.Artist.username}
            </div>
            <img className="SongartistProfilePic" src={song.Artist.imageUrl} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // else
  //   return (
  //     <div className="song-details-container">
  //       {/* <div className='EditSongForm'>
  //             <EditSongModal />
  //           </div> */}
  //       <button className="EditSongForm" onClick={() => setShowModal(true)}>
  //         Edit Song
  //       </button>
  //       {showModal && (
  //         <Modal onClose={() => setShowModal(false)}>
  //           <EditSong setShowModal={setShowModal} />
  //         </Modal>
  //       )}
  //       <button
  //         className="DeleteSongButton"
  //         onClick={() => setModalDelete(true)}
  //       >
  //         Delete Song
  //       </button>
  //       {modalDelete && (
  //         <Modal onClose={() => setModalDelete(false)}>
  //           <DeleteSong setModalDelete={setModalDelete} />
  //         </Modal>
  //       )}
  //       <div className="song-container">
  //         <div className="songName">
  //           <img className="songImage" src={song.imageUrl}></img>
  //           <div className="songTitle">Song: {song.title}</div>
  //           <div className="description">Description: {song.description}</div>
  //           <AudioPlayer
  //             autoPlay={false}
  //             src={song.url}
  //             muted={true}
  //             onPlay={(e) => console.log("onPlay")}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
}
