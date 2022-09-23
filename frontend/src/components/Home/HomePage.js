import "./HomePage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImagesArray } from "../../images/Images";
import { backgroundImages } from "../../images/Images";
import { getAllSongs } from "../../store/songs";
import { getAllDemoSongs } from "../../store/songs";
import { getAllAlbums } from "../../store/albums";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SignUpModal from "../SignUpModal";
import LoginFormModal from "../LoginFormModal";
import LoginAsDemo from "../LoginDemoUser";
import { actionSongPlaying } from "../../store/audioPlayer";

//create default album if user has no albums
import { CreateAnAlbum } from "../../store/albums";

import PlayButtonImage from "../../images/PlayButton.png";

//to get data for splash page without logging in

import { Modal } from "../../context/Modal";
import SignupForm from "../SignUpModal/SignUpForm";
import "../SignUpModal/SignUpForm.css";
import LoginForm from "../LoginFormModal/LoginForm";
import "../LoginFormModal/LoginForm.css";

export function HomePage() {
  //get all songs
  const dispatch = useDispatch();
  const UserSignedIn = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  //create copy of songsarray to mutate for sort
  const SongsArrayCopy = [...SongsArray];

  const albums = useSelector((state) => state.album);
  const AlbumsArray = Object.values(albums);
  const AlbumsArrayCopy = [...AlbumsArray];

  //filter through songs to randomly select whats trending
  let randomNumber;
  let randomNumber2;
  let randomNumber3;

  let filtered;
  let filtered2;
  let filtered3;

  let titleFiltered;

  let sortedByNewest;

  let workoutSongsFilter;

  //prevents counter from updating after every single render

  //set state for images carousel
  const [imageNumber, setImageNumber] = useState(0);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);
  //set state for random trending song
  const [Number, setNumber] = useState(0);
  const [Number2, setNumber2] = useState(1);
  const [Number3, setNumber3] = useState(2);
  // console.log(Number + ' this is the first number mount')
  //set search bar state
  const [searchTitle, setSearchTitle] = useState("");

  // state to keep track of pressed modal
  const [showModal, setShowModal] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);

  // //useEffect to get all songs
  // useEffect(() => {
  //     dispatch(getAllSongs());
  //   }, [dispatch]);

  //randomNumber
  // randomNumber = Math.floor(Math.random() * SongsArray.length);
  //useEffect to setRandomNumber
  // useEffect(() => {
  //     setNumber(randomNumber);
  //   }, [dispatch, Number]);

  // currently trending filter
  // filtered = SongsArray.filter((filteredSongs, index) => index === Number);
  // console.log(filtered + 'filtered')
  // console.log(randomNumber + 'randomNumber')
  // console.log(Number + 'Number')

  let myAlbumsFilter;
  let mySongsFilter;
  // filtered by search

  //useEffect for getting DemoSongs
  useEffect(() => {
    if (!UserSignedIn) {
      //get all songs
      dispatch(getAllDemoSongs());
    }
  }, [dispatch]);
  //useEffect for getting Songs signed in
  useEffect(() => {
    if (UserSignedIn) {
      //get all songs
      dispatch(getAllSongs());
    }
  }, [dispatch, UserSignedIn, CreateAnAlbum, albums]);
  //useEffect for getting Songs signed in
  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch, UserSignedIn]);

  useEffect(() => {
    if (
      UserSignedIn &&
      !myAlbumsFilter.length &&
      AlbumsArray.length &&
      !albums.Artist &&
      !mySongsFilter.length
    ) {
      //get all songs
      dispatch(
        CreateAnAlbum({
          title: "Default Album",
          description: "New album made for new accounts",
          imageUrl:
            "https://static.vecteezy.com/system/resources/previews/001/200/758/original/music-note-png.png",
        })
      );
    }
  }, [dispatch, albums, UserSignedIn, myAlbumsFilter]);
  if (UserSignedIn) {
    mySongsFilter = SongsArray.filter(
      (filteredSongs, index) => filteredSongs.userId == UserSignedIn.id
    );
    //useEffect for creating default album if user does not have one
  }
  if (AlbumsArray && UserSignedIn) {
    myAlbumsFilter = AlbumsArray.filter(
      (filteredSongs, index) => filteredSongs.userId == UserSignedIn.id
    );
  }

  // useEffects for if user isn't signed in set carousel image
  useEffect(() => {
    if (!UserSignedIn && showModal == false && showModalSignIn == false) {
      //get all songs

      if (backgroundImageNumber < backgroundImages.length) {
        const backgroundImageTransition = setInterval(() => {
          //check to see if previous number is greater than images array length, if not then
          setBackgroundImageNumber(
            (previousBackgroundImageNumber) =>
              (previousBackgroundImageNumber + 1) % backgroundImages.length
          );
        }, 3000);

        return () => clearInterval(backgroundImageTransition);
      } else {
        setBackgroundImageNumber(0);
      }
    }
    // if user is signed in
    else {
      if (imageNumber < ImagesArray.length) {
        const ImageTransition = setInterval(() => {
          //check to see if previous number is greater than images array length, if not then
          setImageNumber(
            (previousImageNumber) =>
              (previousImageNumber + 1) % ImagesArray.length
          );
        }, 5000);

        return () => clearInterval(ImageTransition);
      } else {
        setImageNumber(0);
      }
    }
  }, [imageNumber, backgroundImageNumber, showModal, showModalSignIn]);

  //conditional to set trending song
  if (SongsArray.length > 0) {
    randomNumber = Math.floor(Math.random() * SongsArray.length);
    randomNumber2 = Math.floor(Math.random() * SongsArray.length);
    randomNumber3 = Math.floor(Math.random() * SongsArray.length);
  } else {
    randomNumber = Math.floor(Math.random() * 50);
    randomNumber2 = Math.floor(Math.random() * 50);
    randomNumber3 = Math.floor(Math.random() * 50);
  }

  if (randomNumber == randomNumber2 || randomNumber == randomNumber3) {
    randomNumber = Math.floor(Math.random() * 50);
  }
  if (randomNumber2 == randomNumber || randomNumber2 == randomNumber3) {
    randomNumber2 = Math.floor(Math.random() * 50);
  }
  if (randomNumber3 == randomNumber || randomNumber3 == randomNumber2) {
    randomNumber3 = Math.floor(Math.random() * 50);
  }
  // console.log(randomNumber + 'this is Random')
  useEffect(() => {
    setNumber(randomNumber);
    setNumber2(randomNumber2);
    setNumber3(randomNumber3);
    // console.log(Number + ' number has updated')
  }, []);
  //filter songs
  filtered = SongsArray.filter((filteredSongs, index) => index === Number);
  filtered2 = SongsArray.filter((filteredSongs, index) => index === Number2);
  filtered3 = SongsArray.filter((filteredSongs, index) => index === Number3);

  //   handlesubmit for search

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(e.target.value);
  };

  if (SongsArray.length > 45) {
    titleFiltered = SongsArray.filter((filteredSongs, index) =>
      filteredSongs.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  } else {
    titleFiltered = "";
  }

  // console.log(filtered + 'filtered')
  //   console.log(randomNumber + 'randomNumber')
  //   console.log(Number + 'Number')

  //sort through songs array and
  sortedByNewest = SongsArrayCopy.sort((a, b) => b.id - a.id);

  //filter for workout songs

  // workoutSongsFilter = SongsArray.filter((filteredSongs, index) => index == 28 || index == 11 || index == 3 || index == 2 || index == 4 || index == 1 || index == 12 || index == 19 ||
  // index == 22 || index == 30 || index == 31 || index == 32 || index == 33 || index == 34 || index == 35 || index == 36 || index == 37 || index == 38 || index == 39 || index == 43 ||
  // index == 44 || index == 46 || index == 47 || index == 48 || index == 49)
  // let workoutArraySongs = [1, 2, 10, 11, 17, 18, 21, 27, 30, 31, 33, 34, 35, 36, 37, 38, 45, 46, 47, 47]

  workoutSongsFilter = SongsArray.filter(
    (filteredSongs, index) =>
      index == 1 ||
      index == 2 ||
      index == 10 ||
      index == 11 ||
      index == 17 ||
      index == 18 ||
      index == 21 ||
      index == 27 ||
      index == 30 ||
      index == 31 ||
      index == 33 ||
      index == 34 ||
      index == 35 ||
      index == 36 ||
      index == 37 ||
      index == 38 ||
      index == 45 ||
      index == 46 ||
      index == 47 ||
      index == 48
  );
  let hipHopSongsFilter = SongsArray.filter(
    (filteredSongs, index) =>
      index == 0 ||
      index == 1 ||
      index == 2 ||
      index == 11 ||
      index == 26 ||
      index == 34
  );
  //filter for j-rock songs
  let jRockSongsfilter = SongsArray.filter(
    (filteredSongs, index) =>
      index == 21 || index == 27 || index == 5 || index == 43 || index == 49
  );
  //filter for j-rock songs
  let remixSongsFilter = SongsArray.filter(
    (filteredSongs, index) =>
      index == 15 ||
      index == 17 ||
      index == 22 ||
      index == 30 ||
      index == 31 ||
      index == 35 ||
      index == 37 ||
      index == 46 ||
      index == 12
  );
  // conditional function to return certain text on background images

  function backgroundImageText() {
    if ((backgroundImageNumber + 1) % backgroundImages.length == 1)
      return (
        <>
          <h1 className="BackgroundHeader">Discover with MusicCloud!</h1>
          <h2 className="BackgroundHeaderTwo">
            Save tracks, follow artists and build playlists
          </h2>
          <h1 className="BackgroundHeader">All for free</h1>
          <h2 className="BackgroundHeaderTwo">Sign up and connect</h2>
          <div className="CreateAccountButtonHomePage">
            <button className="SignupNavBar" onClick={() => setShowModal(true)}>
              Create account
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <SignupForm setShowModal={setShowModal} />
              </Modal>
            )}
          </div>
          <div className="SignInHomePage">
            <h4 className="backgroundImageText">already have an account?</h4>
            <button
              className="LogInNavBar"
              onClick={() => setShowModalSignIn(true)}
            >
              Sign in
            </button>
            {showModalSignIn && (
              <Modal onClose={() => setShowModalSignIn(false)}>
                <LoginForm setShowModalSignIn={setShowModalSignIn} />
              </Modal>
            )}
          </div>
        </>
      );
    else
      return (
        <>
          <h1 className="BackgroundHeader">
            What's next in music is first on MusicCloud
          </h1>
          <p className="BackgroundText">
            Upload your first track and begin your journey. SoundCloud gives you
            space to create and connect with other artists.
          </p>
          <h2 className="BackgroundHeader">Sign up and connect</h2>
          <div className="CreateAccountButtonHomePage">
            <button className="SignupNavBar" onClick={() => setShowModal(true)}>
              Create account
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <SignupForm setShowModal={setShowModal} />
              </Modal>
            )}
          </div>
        </>
      );
  }

  if (UserSignedIn) {
    return (
      <div className="homePage">
        <h1>Welcome back {UserSignedIn.username}!</h1>
        {/* <div className="CarouselImages">
          {ImagesArray.map((image, index) => {
            return (
              <div
                id={index === imageNumber ? "ActiveImage" : "InactiveImage"}
                key={index}
              >
                {index === imageNumber && (
                  <img className="imagesArray" src={image.image} alt="images" />
                )}
              </div>
            );
          })} */}
        {/* <img className='imagesArray' src={ImagesArray[imageNumber].image} alt='images'/> */}
        {/* </div> */}

        {/* search bar */}
        <div className="headers">
          {/* trending songs */}
          <div className="TrendingSection">
            <h1>These songs are trending!</h1>
            <div className="TrendingContainer">
              <div className="Trendingsong-container">
                {filtered &&
                  filtered.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>

                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
              <div className="Trendingsong-container">
                {filtered2 &&
                  filtered2.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>

                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
              <div className="Trendingsong-container">
                {filtered3 &&
                  filtered3.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* search bar section */}
          <div className="searchBarContainer">
            <h1>Search for songs by title</h1>
            <div className="searchbarDiv">
              <input
                className="searchbar"
                type="search"
                value={searchTitle}
                placeholder={"Enter Song Title..." || searchTitle}
                //   onChange={(e) => setSearchTitle(e.target.value)}
                onChange={handleSubmit}
              />
            </div>
            {/* Or upload your own <button>Upload</button> */}

            <div
              className={
                titleFiltered.length ? "Filteredsong-container" : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {titleFiltered &&
                  titleFiltered.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className={
                !titleFiltered.length && searchTitle != ""
                  ? "errorHandlingSongSearch"
                  : "HiddenResult"
              }
            >
              Song not found
            </div>
          </div>

          {/* newest 50 songs */}
          <div className="searchBarContainer">
            <h1>Charts: New & hot</h1>
            <p className="subheaderHomePage">
              Up-and-coming tracks on MusicCloud
            </p>
            <div
              className={
                sortedByNewest.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {sortedByNewest &&
                  sortedByNewest.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* workout playlist */}
          <div className="searchBarContainer">
            <h1>Workout</h1>
            <p className="subheaderHomePage">Songs for your exercise routine</p>
            <div
              className={
                workoutSongsFilter.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {workoutSongsFilter &&
                  workoutSongsFilter.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* Remix playlist */}
          <div className="searchBarContainer">
            <h1>Remixed Songs</h1>
            <p className="subheaderHomePage">Twists on Classic Songs</p>
            <div
              className={
                remixSongsFilter.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {remixSongsFilter &&
                  remixSongsFilter.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* k-Rock playlist */}
          <div className="searchBarContainer">
            <h1>J-Rock</h1>
            <p className="subheaderHomePage">
              The latest and hottest J-Rock Songs
            </p>
            <div
              className={
                jRockSongsfilter.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {jRockSongsfilter &&
                  jRockSongsfilter.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* hiphop playlist */}
          <div className="searchBarContainer">
            <h1>Hip-Hop</h1>
            <p className="subheaderHomePage">
              The latest and hottest Hip-Hop Songs
            </p>
            <div
              className={
                hipHopSongsFilter.length
                  ? "Filteredsong-container"
                  : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {hipHopSongsFilter &&
                  hipHopSongsFilter.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <h1>Thanks for listening!</h1>
        </div>
      </div>
    );
  }

  //   if user isn't signed in
  else {
    return (
      <div className="homePage">
        <div className="CarouselImages" id="SignedOutCarousel">
          {backgroundImages.map((backgroundImage, index) => {
            return (
              <div
                id={
                  index === backgroundImageNumber
                    ? "ActiveBackground"
                    : "InactiveBackground"
                }
                key={index}
              >
                {index === backgroundImageNumber && (
                  <img
                    className="imagesArray"
                    src={backgroundImage.image}
                    alt="images"
                  />
                )}
              </div>
            );
          })}
          {}
          <div className="foregroundContainer">
            <div>{backgroundImageText()}</div>
            <div className="NotSignedInButtonsContainer">
              <div
                onClick={() => setBackgroundImageNumber(0)}
                id={
                  (backgroundImageNumber + 1) % backgroundImages.length == 1
                    ? "HighlightButtonBackground"
                    : ""
                }
                className="NotSignedInButtonOne"
              ></div>
              <div
                onClick={() => setBackgroundImageNumber(1)}
                id={
                  (backgroundImageNumber + 1) % backgroundImages.length == 0
                    ? "HighlightButtonBackground"
                    : ""
                }
                className="NotSignedInButtonTwo"
              ></div>
            </div>
          </div>
          {/* <img className='imagesArray' src={ImagesArray[imageNumber].image} alt='images'/> */}
        </div>
        <div className="containerForDemoSection">
          <h2 className="DemoHeader">Want to look around first?</h2>
          <div className="demoContainerHome">
            <h3 className="textforDemo">Sign in as a</h3>
            <div className="DemoUserHomePage">
              <LoginAsDemo id="DemoUserHomePage" />
            </div>
          </div>
        </div>

        {/* search bar */}
        <div className="headers">
          {/* trending songs */}
          <div className="TrendingSection">
            <h1>These songs are trending!</h1>
            <div className="TrendingContainer">
              <div className="Trendingsong-container">
                {filtered &&
                  filtered.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>

                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
              <div className="Trendingsong-container">
                {filtered2 &&
                  filtered2.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>

                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
              <div className="Trendingsong-container">
                {filtered3 &&
                  filtered3.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* search bar section */}
          <div className="searchBarContainer">
            <h1>Search for songs by title</h1>
            <div className="searchbarDiv">
              <input
                className="searchbar"
                type="search"
                value={searchTitle}
                placeholder={"Enter Song Title..." || searchTitle}
                //   onChange={(e) => setSearchTitle(e.target.value)}
                onChange={handleSubmit}
              />
            </div>
            {/* Or upload your own <button>Upload</button> */}

            <div
              className={
                titleFiltered.length ? "Filteredsong-container" : "HiddenResult"
              }
            >
              {/* search return map */}
              <div className="FilteredSongsContainer">
                {titleFiltered &&
                  titleFiltered.map((song) => {
                    return (
                      <div className="TrendingsongCard" key={song.id}>
                        <div className="PlayButtonContainer">
                          <img
                            className="PlayMe"
                            src={PlayButtonImage}
                            onClick={() => dispatch(actionSongPlaying(song))}
                          />
                        </div>
                        <img
                          className="TrendingsongImage"
                          src={song.imageUrl}
                        ></img>
                        <NavLink
                          className="TrendingsongLink"
                          to={`/songs/${song.id}`}
                        >
                          {song.title}
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className={
                !titleFiltered.length && searchTitle != ""
                  ? "errorHandlingSongSearch"
                  : "HiddenResult"
              }
            >
              Song not found
            </div>
          </div>

          <h1>Thanks for listening!</h1>
        </div>
      </div>
    );
  }
}
