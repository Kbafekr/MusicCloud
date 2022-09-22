import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import { actionSongPlaying } from "../../store/audioPlayer";
import PlayButtonImage from "../../images/PlayButton.png";
import "./OneSong.css";
import LoginAsDemo from "../LoginDemoUser";
import "../UnknownPage/PageNotFound.css";
import { getAllAlbums } from "../../store/albums";
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
  const allAlbums = useSelector((state) => state.album);
  const song = useSelector((state) => state.song);
  const user = useSelector((state) => state.session.user);
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  let albums;
  let albumsArray;

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch, showModal, user, modalDelete]);

  // }, [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

  if (song.Album) {
    albums = Object.values(song.Album);
  }
  if (allAlbums) {
    albumsArray = Object.values(allAlbums);
  }

  let userSongsFilter;
  let mySongsFilter;

  let userFilteredAlbums;
  if (albums && user) {
    mySongsFilter = albums.filter((filteredSongs, index) => index == 0);
  }
  if (albumsArray && user) {
    userFilteredAlbums = albumsArray.filter(
      (filteredSongs, index) => filteredSongs.userId == song.userId
    );
  }
  if (albumsArray && user) {
    console.log(albumsArray);
    userSongsFilter = albumsArray.filter(
      (filteredSongs, index) => filteredSongs.id == song.userId
    );
  }
  function DateTimeSubString() {
    if (song.createdAt) {
      const string = Object.values(song.createdAt);

      const newString = string.join("");

      const subString = newString.substring(0, 10);
      return <span>{subString}</span>;
    }
  }
  function DateTimeSubStringUpdate() {
    if (song.updatedAt) {
      const string = Object.values(song.updatedAt);

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

  if (!song.id) {
    return (
      <div className="errorPage">
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
    );
  }
  if (song.Artist && song.Album && song.Artist.id == user.id) {
    return (
      <div className="OverallContainerAlbumDetails">
        <div className="BackgroundAlbumDetailsSection">
          {/* top half */}
          <div className="AlbumDetailsForegroundSection">
            <img className="AlbumArtwork" src={song.imageUrl} />
            <div className="AlbumDetailsTitleSection">
              <div className="SoundPlayButtonAlbumDetailsContainer">
                <img
                  className="PlayButtonAlbumDetails"
                  src={PlayButtonImage}
                  onClick={() => dispatch(actionSongPlaying(song))}
                />
              </div>
              <div className="TitleSectionAlbumDetailsContainer">
                <div className="TitleAlbumDetailsContainer">
                  <h1 className="HeaderAlbumDetailsTitle">
                    <span>{song.title}</span>
                  </h1>
                </div>
                <div className="UsernameAlbumDetailsContainer">
                  <h2 className="UsernameAlbumDetailsTitle">
                    {song.Artist.username}
                  </h2>
                </div>
              </div>
            </div>
            {/* Info section */}
            <div className="InfoSectionAlbumDetails">
              <div className="InfoSectionAlbumCreatedTime">
                <time className="relativeTime" dateTime={song.createdAt}>
                  <span>Created on: {DateTimeSubString()}</span>
                </time>
              </div>
              <div className="InfoSectionAlbumIdDetails">
                <span>Song id: {song.id}</span>
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
                        Edit Song
                      </button>
                      {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                          <EditSong setShowModal={setShowModal} />
                        </Modal>
                      )}
                    </div>
                    <div className="DeleteAlbumButtonContainerMain">
                      <button
                        className="DeleteAlbumButton"
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
                  </div>
                </div>
              </div>
              <div className="AboutAlbumDetailsMainContentContainer">
                <div className="AboutAlbumDetailsUserContainer">
                  <div className="UserSubContainerAlbumDetails">
                    <div className="UserContainerUserImageAlbumDetails">
                      <div className="UserImageAlbumDetailsContainer">
                        <img
                          className="UserImageAlbumDetailsMainContainer"
                          src={song.Artist.imageUrl}
                        />
                      </div>
                    </div>
                    <div className="UserContainerUserNameAlbumDetails">
                      <div className="UserTitleAlbumDetailsContainer">
                        <h3 className="UserNameAlbumDetailsMain">
                          <span>{song.Artist.username}</span>
                          <span>
                            <span></span>
                          </span>
                        </h3>
                      </div>
                      <div className="UserTitleAlbumDetailsContainer">
                        <h3 className="UserIdAlbumDetailsMain">
                          <span>User Id: #{song.Artist.id}</span>
                          <span>
                            <span></span>
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* main section of content, middlemost part */}
              <div className="MiddlePartOverallContainer">
                <div className="TopHalfMiddlePartContainer">
                  <div className="LastUpdatedAlbumDetailsHeader">
                    Song last updated:
                  </div>
                  <div className="LastUpdatedAlbumDetailsInformation">
                    {DateTimeSubStringUpdate()}
                  </div>
                  <div className="LastUpdatedAlbumDetailsHeader">
                    {song.description}
                  </div>
                </div>
                <div className="BottomHalfMiddlePartContainer">
                  <div className="SongsInAlbumDetailsContainers">
                          <div className="SongInAlbumDetails" key={song.Album.id}>
                            <div className="SongInAlbumDetailsContainer">
                              <div className="SongImageContainerAlbumDetailsList">
                                <img
                                  className="songImageAlbumDetailsList"
                                  src={song.Album.imageUrl}
                                ></img>
                              </div>
                              <div className="SongIdinTrackListAlbumDetailsContainer">
                                <div className="SongIdinTrackListAlbumDetails">
                                  Album id: #{song.Album.id}
                                </div>
                              </div>
                              <div className="SongNumberInTrackListAlbumDetailsContainer">
                                Album Title:{" "}
                              </div>
                              <NavLink
                                className="TrendingsongLink"
                                to={`/albums/${song.Album.id}`}
                              >
                                {song.Album.title}
                              </NavLink>
                            </div>
                          </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right most side bar */}
          <div className="AboutAlbumDetailsSideBar">
            <div className="sideBarTopContainer">
              <div className="sideBarSubContainer">
                <h3 className="sideBarTopHeaderContainer">
                  <span>albums from this user</span>
                </h3>
              </div>
            </div>
            <div className="SideBarContentMainSection">
              <div className="SongsInSideBarContainers">
                {userFilteredAlbums &&
                  userFilteredAlbums.map((song) => {
                    return (
                      <div className="SongInSideBarDetails" key={song.id}>
                        <div className="SongInSidebarContainer">
                          <div className="SongImageContainerAlbumDetailsList">
                            <img
                              className="songImageAlbumDetailsList"
                              src={song.imageUrl}
                            ></img>
                          </div>
                          <NavLink
                            className="TrendingsongLink"
                            to={`/albums/${song.id}`}
                          >
                            {song.title}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (song.Artist && song.Album && song.Artist.id != user.id) {
    return (
      <div className="OverallContainerAlbumDetails">
        <div className="BackgroundAlbumDetailsSection">
          {/* top half */}
          <div className="AlbumDetailsForegroundSection">
            <img className="AlbumArtwork" src={song.imageUrl} />
            <div className="AlbumDetailsTitleSection">
              <div className="SoundPlayButtonAlbumDetailsContainer">
                <img
                  className="PlayButtonAlbumDetails"
                  src={PlayButtonImage}
                  onClick={() => dispatch(actionSongPlaying(song))}
                />
              </div>
              <div className="TitleSectionAlbumDetailsContainer">
                <div className="TitleAlbumDetailsContainer">
                  <h1 className="HeaderAlbumDetailsTitle">
                    <span>{song.title}</span>
                  </h1>
                </div>
                <div className="UsernameAlbumDetailsContainer">
                  <h2 className="UsernameAlbumDetailsTitle">
                    {song.Artist.username}
                  </h2>
                </div>
              </div>
            </div>
            {/* Info section */}
            <div className="InfoSectionAlbumDetails">
              <div className="InfoSectionAlbumCreatedTime">
                <time className="relativeTime" dateTime={song.createdAt}>
                  <span>Created on: {DateTimeSubString()}</span>
                </time>
              </div>
              <div className="InfoSectionAlbumIdDetails">
                <span>Song id: {song.id}</span>
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
                    You do not own this song
                  </div>
                </div>
              </div>
              <div className="AboutAlbumDetailsMainContentContainer">
                <div className="AboutAlbumDetailsUserContainer">
                  <div className="UserSubContainerAlbumDetails">
                    <div className="UserContainerUserImageAlbumDetails">
                      <div className="UserImageAlbumDetailsContainer">
                        <img
                          className="UserImageAlbumDetailsMainContainer"
                          src={song.Artist.imageUrl}
                        />
                      </div>
                    </div>
                    <div className="UserContainerUserNameAlbumDetails">
                      <div className="UserTitleAlbumDetailsContainer">
                        <h3 className="UserNameAlbumDetailsMain">
                          <span>{song.Artist.username}</span>
                          <span>
                            <span></span>
                          </span>
                        </h3>
                      </div>
                      <div className="UserTitleAlbumDetailsContainer">
                        <h3 className="UserIdAlbumDetailsMain">
                          <span>User Id: #{song.Artist.id}</span>
                          <span>
                            <span></span>
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* main section of content, middlemost part */}
              <div className="MiddlePartOverallContainer">
                <div className="TopHalfMiddlePartContainer">
                  <div className="LastUpdatedAlbumDetailsHeader">
                    Song last updated:
                  </div>
                  <div className="LastUpdatedAlbumDetailsInformation">
                    {DateTimeSubStringUpdate()}
                  </div>
                  <div className="LastUpdatedAlbumDetailsHeader">
                    {song.description}
                  </div>
                </div>
                <div className="BottomHalfMiddlePartContainer">
                  <div className="SongsInAlbumDetailsContainers">
                          <div className="SongInAlbumDetails" key={song.Album.id}>
                            <div className="SongInAlbumDetailsContainer">
                              <div className="SongImageContainerAlbumDetailsList">
                                <img
                                  className="songImageAlbumDetailsList"
                                  src={song.Album.imageUrl}
                                ></img>
                              </div>
                              <div className="SongIdinTrackListAlbumDetailsContainer">
                                <div className="SongIdinTrackListAlbumDetails">
                                  Album id: #{song.Album.id}
                                </div>
                              </div>
                              <div className="SongNumberInTrackListAlbumDetailsContainer">
                                Album Title:{" "}
                              </div>
                              <NavLink
                                className="TrendingsongLink"
                                to={`/albums/${song.Album.id}`}
                              >
                                {song.Album.title}
                              </NavLink>
                            </div>
                          </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right most side bar */}
          <div className="AboutAlbumDetailsSideBar">
            <div className="sideBarTopContainer">
              <div className="sideBarSubContainer">
                <h3 className="sideBarTopHeaderContainer">
                  <span>albums from this user</span>
                </h3>
              </div>
            </div>
            <div className="SideBarContentMainSection">
              <div className="SongsInSideBarContainers">
                {userFilteredAlbums &&
                  userFilteredAlbums.map((song) => {
                    return (
                      <div className="SongInSideBarDetails" key={song.id}>
                        <div className="SongInSidebarContainer">
                          <div className="SongImageContainerAlbumDetailsList">
                            <img
                              className="songImageAlbumDetailsList"
                              src={song.imageUrl}
                            ></img>
                          </div>
                          <NavLink
                            className="TrendingsongLink"
                            to={`/albums/${song.id}`}
                          >
                            {song.title}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   return (
  //     <div className="song-details-container">
  //       <div className="buttonsEditAndDeleteSong">
  //         <button className="EditSongForm" onClick={() => setShowModal(true)}>
  //           Edit Song
  //         </button>
  //         {showModal && (
  //           <Modal onClose={() => setShowModal(false)}>
  //             <EditSong setShowModal={setShowModal} />
  //           </Modal>
  //         )}
  //         <button
  //           className="DeleteSongButton"
  //           onClick={() => setModalDelete(true)}
  //         >
  //           Delete Song
  //         </button>
  //         {modalDelete && (
  //           <Modal onClose={() => setModalDelete(false)}>
  //             <DeleteSong setModalDelete={setModalDelete} />
  //           </Modal>
  //         )}
  //       </div>
  //       <div className="Onesong-container">
  //         {/* song */}
  //         <div className="SinglesongCard">
  //           <div className="songName">
  //             <img className="OnesongImage" src={song.imageUrl}></img>
  //             <div className="songTitle">Song: {song.title}</div>
  //             <div className="description">Description: {song.description}</div>
  //             <AudioPlayer
  //               autoPlay={false}
  //               src={song.url}
  //               muted={true}
  //               onPlay={(e) => console.log("onPlay")}
  //             />
  //           </div>
  //         </div>
  //         {/* album */}
  //         <div className="Song-Album-container">
  //           <div className="Song-Album-Card">
  //             <div className="OneSongalbumId">Album # {song.Album.id}</div>
  //             <img className="OnealbumImage" src={song.Album.imageUrl} />
  //             <NavLink className="OneSongalbumLink" to={`/albums/${song.Album.id}`}>
  //               {song.Album.title}
  //             </NavLink>
  //           </div>
  //         </div>
  //         {/* artist */}
  //         <div className="Song-Artist-container">
  //         <div className="Song-Artist-Card">
  //           <div className="OneSongartistId">Artist: {song.Artist.id}</div>
  //           <div className="OneSongartistUsername">
  //             Username: {song.Artist.username}
  //           </div>
  //           <img className="SongartistProfilePic" src={song.Artist.imageUrl} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
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
