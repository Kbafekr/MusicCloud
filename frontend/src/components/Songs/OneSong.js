import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSongs } from "../../store/songs";
import { actionSongPlaying } from "../../store/audioPlayer";
import PlayButtonImage from "../../images/PlayButton.png";
import "./OneSong.css";
import "../Albums/AlbumDetails/OneAlbum.css";
import LoginAsDemo from "../LoginDemoUser";
import "../UnknownPage/PageNotFound.css";
import { getAllAlbums } from "../../store/albums";
//import modal file create album index
import { Modal } from "../../context/Modal";
import EditSong from "./EditSongForm";

// comments
import CreateCommentModal from "../Comments/createCommentIndex";
import { getAllComments } from "../../store/comments";
import EditComment from "../Comments/EditCommentForm";
import DeleteComment from "../Comments/DeleteCommentForm";
//exceeded rendering capacity with conditional rendering for nested properties
//just create modal in here

//create modal for delete
// import DeleteSongModal from "./DeleteFormIndex";
import DeleteSong from "./DeleteSongForm";

//get all songs, dispatch thunk action creator
export default function SongDetails() {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [showModalComments, setShowModalComments] = useState(false);
  const [modalDeleteComments, setModalDeleteComments] = useState(false);

  // to keep track of individual comments
  const [commentState, setCommentState] = useState({});
  const [commentDeleteState, setCommentDeleteState] = useState({});

  const songs = useSelector((state) => state.song);

  const song = { ...songs[songId] };
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments);

  const commentsArray = Object.values(comments);

  const lastComment = { ...commentsArray[commentsArray.length - 1] };

  const firstComment = { ...commentsArray[0] };
  // console.log(firstComment)

  let commentsarraycopy = [...commentsArray];

  let sortedCommentsbyNewest = commentsarraycopy.sort((a, b) => b.id - a.id);

  let songsArray;

  let rerender;
  let checkAllcomments;
  let renderAgain;
  if (commentsArray.length > 0) {
    checkAllcomments = sortedCommentsbyNewest.map(
      (comment) => comment.User !== undefined
    );
  }

  let allCommentcheckValues;

  if (commentsArray.length > 0) {
    allCommentcheckValues = Object.values(checkAllcomments).includes(false);
  }

  let allCommentsComponents = true;
  if (allCommentcheckValues && commentsArray.length > 0) {
    allCommentsComponents = false;
  }

  if (!song.Album && !song.Artist) {
    rerender += 1;
  }

  if (allCommentsComponents == false && commentsArray.length > 0) {
    renderAgain += 1;
  }

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch, showModal, user, modalDelete, rerender]);

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch, showModal, user, modalDelete, rerender]);

  useEffect(() => {
    dispatch(getAllComments(songId));
  }, [
    dispatch,
    user,
    songId,
    renderAgain,
    showModalComments,
    modalDeleteComments,
  ]);
  // dispatch, showModal, user, modalDelete, songId, renderAgain]);

  // useEffect(getOneSong(songId))

  // }, [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

  if (songs) {
    songsArray = Object.values(songs);
  }

  let userSongsFilter;

  if (songsArray && user && song.Artist) {
    userSongsFilter = songsArray.filter(
      (filteredSongs, index) => filteredSongs.userId === song.Artist.id
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

  // Comments Section
  //
  //
  //
  //

  function CommentsSection() {
    if (commentsArray.length > 0 && allCommentsComponents == true) {
      return (
        <>
          <div
            className="LastUpdatedAlbumDetailsInformation"
            id="CommentsDivisionHeader"
          >
            <CreateCommentModal className="createSongForm" />
          </div>
          <div className="CommentsContainerSongs">
            {sortedCommentsbyNewest &&
              sortedCommentsbyNewest.map((comment, index) => {
                return (
                  <div className="SongInAlbumDetails" key={comment.id}>
                    <div className="CommentsInAlbumDetailsContainers">
                      <div className="SongInAlbumDetailsContainer">
                        <div className="TracklistContainer">
                          <div className="LeftSideOfTrackList">
                            <div className="SongImageContainerAlbumDetailsList">
                              <img
                                alt="album artwork"
                                className="songImageAlbumDetailsList"
                                src={comment.User.imageUrl}
                              ></img>
                            </div>
                            <div className="ContainerforCommentsBodyandUsername">
                              <div className="CommentsUsernameincontainer">
                                {comment.User.username}
                              </div>
                              <div className="CommentsBody">{comment.body}</div>
                            </div>
                          </div>
                          <div className="SongIdinTrackListAlbumDetailsContainer">
                            <div className="AboutCommentsDetailsMainHeaderContainerFlexBox">
                              {user.id == comment.User.id && (
                                <div className="EditCommentsButtonContainerMain">
                                  <button
                                    className="EditAlbumButton"
                                    id="EditCommentButton"
                                    onClick={() => {
                                      setShowModalComments(true);
                                      {
                                        setCommentState(comment);
                                      }
                                    }}
                                  >
                                    Edit Comment
                                  </button>
                                  {showModalComments && (
                                    <Modal
                                      onClose={() =>
                                        setShowModalComments(false)
                                      }
                                    >
                                      <EditComment
                                        setShowModalComments={
                                          setShowModalComments
                                        }
                                        comment={commentState}
                                      />
                                    </Modal>
                                  )}
                                </div>
                              )}
                              {user.id == comment.User.id && (
                                <div className="DeleteAlbumButtonContainerMain">
                                  <button
                                    className="DeleteAlbumButton"
                                    id="DeleteCommentButton"
                                    onClick={() => {
                                      setModalDeleteComments(true);
                                      {
                                        setCommentDeleteState(comment);
                                      }
                                    }}
                                  >
                                    Delete Comment
                                  </button>
                                  {modalDeleteComments && (
                                    <Modal
                                      onClose={() =>
                                        setModalDeleteComments(false)
                                      }
                                    >
                                      <DeleteComment
                                        setModalDeleteComments={
                                          setModalDeleteComments
                                        }
                                        comment={commentDeleteState}
                                      />
                                    </Modal>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="LastUpdatedAlbumDetailsInformation"
            id="CommentsDivisionHeader"
          >
            <CreateCommentModal className="createSongForm" />
          </div>
        </>
      );
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
  if (
    song.Artist &&
    song.Album &&
    song.Artist.id === user.id
  ) {
    return (
      <div className="OverallContainerAlbumDetails">
        <div className="BackgroundAlbumDetailsSection">
          {/* top half */}
          <div className="AlbumDetailsForegroundSection">
            <img
              className="AlbumArtwork"
              src={song.imageUrl}
              alt="album artwork"
            />
            <div className="AlbumDetailsTitleSection">
              <div className="SoundPlayButtonAlbumDetailsContainer">
                <img
                  className="PlayButtonAlbumDetailsMainPlay"
                  src={PlayButtonImage}
                  alt="play button hover artwork"
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
                  <div className="InfoSectionAlbumIdDetails">Created on:</div>
                  <div className="DateTimeInfoStyle">{DateTimeSubString()}</div>
                </time>
              </div>
            </div>
            <div className="WaveFormContainerAlbumDetails">
              <div className="WaveFormSubContainer"></div>
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
                          alt="user artwork"
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
                        <div className="TracklistContainer">
                          <div className="LeftSideOfTrackList">
                            <div className="SongImageContainerAlbumDetailsList">
                              <img
                                alt="album artwork"
                                className="songImageAlbumDetailsList"
                                src={song.Album.imageUrl}
                              ></img>
                            </div>
                            <div className="SongNumberInTrackListAlbumDetailsContainer">
                              Album Title:{" "}
                            </div>
                            <NavLink
                              className="TrendingsongLinkTrackList"
                              to={`/albums/${song.Album.id}`}
                            >
                              {song.Album.title}
                            </NavLink>
                          </div>
                          <div className="SongIdinTrackListAlbumDetailsContainer">
                            <div className="SongIdinTrackListAlbumDetails">
                              Album id: #{song.Album.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {CommentsSection()}
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
                  <span>Songs from this user</span>
                </h3>
              </div>
            </div>
            <div className="SideBarContentMainSection">
              <div className="SongsInSideBarContainers">
                {userSongsFilter &&
                  userSongsFilter.map((song) => {
                    return (
                      <div className="SongInSideBarDetails" key={song.id}>
                        <div className="SongInSidebarContainer">
                          <div className="PlayButtonContainerSideBar">
                            <img
                              alt="album artwork"
                              className="PlayButtonAlbumDetails"
                              src={PlayButtonImage}
                              onClick={() => dispatch(actionSongPlaying(song))}
                            />
                          </div>
                          <div className="SongImageContainerAlbumDetailsList">
                            <img
                              alt="song artwork"
                              className="songImageAlbumDetailsList"
                              src={song.imageUrl}
                            ></img>
                          </div>
                          <NavLink
                            className="TrendingsongLinkTrackList"
                            to={`/songs/${song.id}`}
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
  if (song.Artist && song.Album && song.Artist.id !== user.id) {
    return (
      <div className="OverallContainerAlbumDetails">
        <div className="BackgroundAlbumDetailsSection">
          {/* top half */}
          <div className="AlbumDetailsForegroundSection">
            <img
              className="AlbumArtwork"
              alt="album artwork"
              src={song.imageUrl}
            />
            <div className="AlbumDetailsTitleSection">
              <div className="SoundPlayButtonAlbumDetailsContainer">
                <img
                  alt="play button artwork"
                  className="PlayButtonAlbumDetailsMainPlay"
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
                  <div className="InfoSectionAlbumIdDetails">Created on:</div>
                  <div className="DateTimeInfoStyle">{DateTimeSubString()}</div>
                </time>
              </div>
            </div>
            <div className="WaveFormContainerAlbumDetails">
              <div className="WaveFormSubContainer">
                {/* <img
                  className="WaveFormImg"
                  src="https://www.onlygfx.com/wp-content/uploads/2022/03/colorful-sound-wave-equalizer-2.png"
                /> */}
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
                          alt="artist artwork"
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
                        <div className="TracklistContainer">
                          <div className="LeftSideOfTrackList">
                            <div className="SongImageContainerAlbumDetailsList">
                              <img
                                alt="album artwork"
                                className="songImageAlbumDetailsList"
                                src={song.Album.imageUrl}
                              ></img>
                            </div>
                            <div className="SongNumberInTrackListAlbumDetailsContainer">
                              Album Title:{" "}
                            </div>
                            <NavLink
                              className="TrendingsongLinkTrackList"
                              to={`/albums/${song.Album.id}`}
                            >
                              {song.Album.title}
                            </NavLink>
                          </div>
                          <div className="SongIdinTrackListAlbumDetailsContainer">
                            <div className="SongIdinTrackListAlbumDetails">
                              Album id: #{song.Album.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {CommentsSection()}
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
                  <span>Songs from this user</span>
                </h3>
              </div>
            </div>
            <div className="SideBarContentMainSection">
              <div className="SongsInSideBarContainers">
                {userSongsFilter &&
                  userSongsFilter.map((song) => {
                    return (
                      <div className="SongInSideBarDetails" key={song.id}>
                        <div className="SongInSidebarContainer">
                          <div className="PlayButtonContainerSideBar">
                            <img
                              alt="play button artwork"
                              className="PlayButtonAlbumDetails"
                              src={PlayButtonImage}
                              onClick={() => dispatch(actionSongPlaying(song))}
                            />
                          </div>
                          <div className="SongImageContainerAlbumDetailsList">
                            <img
                              alt="song artwork"
                              className="songImageAlbumDetailsList"
                              src={song.imageUrl}
                            ></img>
                          </div>
                          <NavLink
                            className="TrendingsongLinkTrackList"
                            to={`/songs/${song.id}`}
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
}
