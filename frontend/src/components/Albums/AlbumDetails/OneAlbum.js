import React, { Suspense, useState, useEffect } from "react";
import { getOneAlbum } from "../../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { actionSongPlaying } from "../../../store/audioPlayer";
import "./OneAlbum.css";
import PlayButtonImage from "../../../images/PlayButton.png";
import LoginAsDemo from "../../LoginDemoUser";
import "../../UnknownPage/PageNotFound.css";
import WaveForm from "../../../images/WaveForm.png";
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

  let songs;

  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneAlbum(albumId));
  }, [dispatch, showModal, user, modalDelete]);
  // dispatch, album.Artist, album.Songs]);
  //  [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])
  if (album.Songs) {
    songs = Object.values(album.Songs);
  }
  function DateTimeSubString() {
    if (album.createdAt) {
      const string = Object.values(album.createdAt);

      const newString = string.join("");

      const subString = newString.substring(0, 10);
      return <span>{subString}</span>;
    }
  }
  if (!user) {
    return (
      <div className="errorPage">
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
      <div className="errorPage">
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
    );
  }

  //main section
  if (album.Artist && album.Songs) {
    return (
      <div className="OverallContainerAlbumDetails">
        <div className="BackgroundAlbumDetailsSection">
          {/* top half */}
          <div className="AlbumDetailsForegroundSection">
            <img className="AlbumArtwork" src={album.imageUrl} />
            <div className="AlbumDetailsTitleSection">
              <div className="SoundPlayButtonAlbumDetailsContainer">
                {songs &&
                  songs.map((song) => {
                    return (
                      <img
                        className="PlayButtonAlbumDetails"
                        src={PlayButtonImage}
                        onClick={() => dispatch(actionSongPlaying(song))}
                      />
                    );
                  })}
              </div>
              <div className="TitleSectionAlbumDetailsContainer">
                <div className="TitleAlbumDetailsContainer">
                  <h1 className="HeaderAlbumDetailsTitle">
                    <span>{album.title}</span>
                  </h1>
                </div>
                <div className="UsernameAlbumDetailsContainer">
                  <h2 className="UsernameAlbumDetailsTitle">
                    {album.Artist.username}
                  </h2>
                </div>
              </div>
            </div>
            {/* Info section */}
            <div className="InfoSectionAlbumDetails">
              <div className="InfoSectionAlbumCreatedTime">
                <time className="relativeTime" dateTime={album.createdAt}>
                  <span>Created on: {DateTimeSubString()}</span>
                </time>
              </div>
              <div className="InfoSectionAlbumIdDetails">
                <span>Album id: {album.id}</span>
              </div>
            </div>
            <div className="WaveFormContainerAlbumDetails">
              <div className="WaveFormSubContainer">
                <img
                  className="WaveFormImg"
                  src="https://www.onlygfx.com/wp-content/uploads/2022/03/colorful-sound-wave-equalizer-2.png"
                />
              </div>
            </div>
          </div>
        </div>
        {/* bottom half */}
        <div className="AboutAlbumDetailsSection">
          <div className="AboutAlbumDetailsMainContainer">
            <div className="AboutAlbumDetailsMain">
              <div className="AboutAlbumDetailsMainHeader">
                <div className="AboutAlbumDetailsMainHeaderContainer">
                  <div className="AboutAlbumDetailsMainHeaderContainerFlexBox">
                    <div className="EditAlbumButtonContainerMain">
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
                      </div>
                      <div className="DeleteAlbumButtonContainerMain">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="AboutAlbumDetailsSideBar"></div>
        </div>
      </div>
    );
  }

  //     <div className="album-details-container">
  //       <div className="buttonsEditAndDeleteAlbum">
  //         <button
  //           className="EditAlbumButton"
  //           onClick={() => setShowModal(true)}
  //         >
  //           Edit Album
  //         </button>
  //         {showModal && (
  //           <Modal onClose={() => setShowModal(false)}>
  //             <EditAlbum setShowModal={setShowModal} />
  //           </Modal>
  //         )}

  //         <button
  //           className="DeleteAlbumButton"
  //           onClick={() => setModalDelete(true)}
  //         >
  //           Delete Album
  //         </button>
  //         {modalDelete && (
  //           <Modal onClose={() => setModalDelete(false)}>
  //             <DeleteAlbum setModalDelete={setModalDelete} />
  //           </Modal>
  //         )}
  //       </div>
  //       <div className="Onealbum-container">
  //         <div className="OneAlbumCard">
  //           <div className="OnealbumTitle">Album: {album.title}</div>
  //           <img className="OnealbumImage" src={album.imageUrl}></img>
  //           <div className="OnealbumDescription">
  //             Description: {album.description}
  //           </div>
  //         </div>
  //       </div>

  //       <div className="Album-Artist-container">
  //         <div key={album.Artist.id} className="OneAlbumartistCard">
  //           <div className="OneAlbumArtistUserId">Artist: {album.userId}</div>
  //           <img
  //             className="Album-artistProfilePic"
  //             src={album.Artist.imageUrl}
  //           />
  //           <div className="Album-artistUsername">
  //             Artist Username: {album.Artist.username}
  //           </div>
  //         </div>
  //       </div>

  //       <div className="OneAlbum-Songs-container">
  //         {album.Songs.map((song) => {
  //           return (
  //             <div key={song.id} className="OneAlbum-songCard">
  //               <div className="EachSongId">Song id: {song.id}</div>
  //               <img className="OneAlbum-songImage" src={song.imageUrl} />
  //               <NavLink className="OneAlbum-songLink" to={`/songs/${song.id}`}>
  //                 {song.title}
  //               </NavLink>
  //               <div className="OneAlbum-songDescription">
  //                 Song Description: {song.description}
  //               </div>

  //               <div className="audioPlayer">
  //                 <AudioPlayer
  //                   autoPlay={false}
  //                   src={song.url}
  //                   onPlay={(e) => console.log("onPlay")}
  //                 />
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
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
