import React, { Suspense, useState, useEffect } from "react";
import { getOneAlbum } from "../../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./OneAlbum.css";
import Whomp from "../../../images/Whomp.webp";
import LoginAsDemo from "../../LoginDemoUser";
import "../../UnknownPage/PageNotFound.css";
// import EditAlbumModal from "./EditAlbumIndex";

//import modal file create album index
import { Modal } from "../../../context/Modal";
import EditAlbum from "./EditAlbumForm";
//exceeded rendering capacity with conditional rendering for nested properties
//just create modal in here

//create modal for delete
// import DeleteAlbumModal from "./DeleteAlbumIndex";
import DeleteAlbum from "./DeleteAlbumForm";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//get one album, dispatch thunk action creator
export default function AlbumDetails() {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const album = useSelector((state) => state.album);
  const user = useSelector((state) => state.session.user);
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneAlbum(albumId));
  }, [dispatch, showModal, user, modalDelete]);
  // dispatch, album.Artist, album.Songs]);
  //  [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

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

  if (!album.id) {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <div className="errorPage">
          <h1>Whomp Whomp!</h1>
          <div className="Whomps">
            <img className="whomp1" src={Whomp} alt="Whomp1" />
            <img className="whomp2" src={Whomp} alt="Whomp2" />
          </div>
          <div className="headers">
            <h2>Looks like this album doesn't exist</h2>
            <div className="linkerror">
              <NavLink to="/" className="ErrorhomeLink">
                Click here to go home
              </NavLink>
              <NavLink to="/albums" className="ErrorsongsLink">
                Click here to go back to all albums
              </NavLink>
              <NavLink to="/albums/current" className="ErrorownedLink">
                Click here to go back to owned albums
              </NavLink>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }

  if (album.Artist && album.Songs) {
    return (
      <div className="album-details-container">
        <div className="buttonsEditAndDeleteAlbum">
          <button
            className="EditAlbumButton"
            onClick={() => setShowModal(true)}
          >
            Edit Album
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditAlbum setShowModal={setShowModal} />
            </Modal>
          )}

          <button
            className="DeleteAlbumButton"
            onClick={() => setModalDelete(true)}
          >
            Delete Album
          </button>
          {modalDelete && (
            <Modal onClose={() => setModalDelete(false)}>
              <DeleteAlbum setModalDelete={setModalDelete} />
            </Modal>
          )}
        </div>
        <div className="Onealbum-container">
          <div className="OneAlbumCard">
            <div className="OnealbumTitle">Album: {album.title}</div>
            <img className="OnealbumImage" src={album.imageUrl}></img>
            <div className="OnealbumDescription">
              Description: {album.description}
            </div>
          </div>
        </div>

        <div className="Album-Artist-container">
          <div key={album.Artist.id} className="OneAlbumartistCard">
            <div className="OneAlbumArtistUserId">Artist: {album.userId}</div>
            <img
              className="Album-artistProfilePic"
              src={album.Artist.imageUrl}
            />
            <div className="Album-artistUsername">
              Artist Username: {album.Artist.username}
            </div>
          </div>
        </div>

        <div className="OneAlbum-Songs-container">
          {album.Songs.map((song) => {
            return (
              <div key={song.id} className="OneAlbum-songCard">
                <img className="OneAlbum-songImage" src={song.imageUrl} />
                <NavLink className="OneAlbum-songLink" to={`/songs/${song.id}`}>
                  {song.title}
                </NavLink>
                <div className="OneAlbum-songDescription">
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
  }
  // else
  //   return (
  //     <div className="album-details-container">
  //       <button className="EditAlbumButton" onClick={() => setShowModal(true)}>
  //         Edit Album
  //       </button>
  //       {showModal && (
  //         <Modal onClose={() => setShowModal(false)}>
  //           <EditAlbum setShowModal={setShowModal} />
  //         </Modal>
  //       )}
  //       <button
  //         className="DeleteAlbumButton"
  //         onClick={() => setModalDelete(true)}
  //       >
  //         Delete Album
  //       </button>
  //       {modalDelete && (
  //         <Modal onClose={() => setModalDelete(false)}>
  //           <DeleteAlbum setModalDelete={setModalDelete} />
  //         </Modal>
  //       )}
  //       <div className="album-container">
  //         <div className="albumKey" key={albumId}>
  //           <div className="albumTitle">{album.title}</div>
  //           <img className="albumImage" src={album.imageUrl}></img>
  //           <div className="albumDescription">
  //             Description: {album.description}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
