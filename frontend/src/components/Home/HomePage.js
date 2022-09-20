import "./HomePage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImagesArray } from "../../images/Images";
import { backgroundImages } from "../../images/Images";
import { getAllSongs } from "../../store/songs";
import { getAllDemoSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SignUpModal from "../SignUpModal";
import LoginFormModal from "../LoginFormModal";
import LoginAsDemo from "../LoginDemoUser";
import { actionSongPlaying } from "../../store/audioPlayer";

import PlayButtonImage from "../../images/PlayButton.png";

//to get data for splash page without logging in

export function HomePage() {

  //get all songs
  const dispatch = useDispatch();
  const UserSignedIn = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);
  //filter through songs to randomly select whats trending
  let randomNumber;

  let filtered;
  let titleFiltered;
  //prevents counter from updating after every single render

  //set state for images carousel
  const [imageNumber, setImageNumber] = useState(0);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);
  //set state for random trending song
  const [Number, setNumber] = useState(4);
  // console.log(Number + ' this is the first number mount')
  //set search bar state
  const [searchTitle, setSearchTitle] = useState("");

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

  // filtered by search

//useEffect for getting DemoSongs
useEffect(() => {
  if (!UserSignedIn) {
    //get all songs
    dispatch(getAllDemoSongs())
  } }, [dispatch])
//useEffect for getting Songs signed in
useEffect(() => {
  if (UserSignedIn) {
    //get all songs
    dispatch(getAllSongs())
  } }, [dispatch])


  // useEffects for if user isn't signed in set carousel image
  useEffect(() => {
    if (!UserSignedIn) {
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
    }}
  }, [imageNumber, backgroundImageNumber]);

  //conditional to set trending song
if (SongsArray.length > 0) {
  randomNumber = Math.floor(Math.random() *  SongsArray.length);
}
else {
  randomNumber = Math.floor(Math.random() *  50)
}
  // console.log(randomNumber + 'this is Random')
  useEffect(() => {
    setNumber(randomNumber);
    // console.log(Number + ' number has updated')
  }, [Number]);


  filtered = SongsArray.filter((filteredSongs, index) => index === Number);

  //   handlesubmit for search

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(e.target.value);
  };

  titleFiltered = SongsArray.filter(
    (filteredSongs, index) =>
      filteredSongs.title.toLowerCase() == searchTitle.toLowerCase()
  );

  // console.log(filtered + 'filtered')
  //   console.log(randomNumber + 'randomNumber')
  //   console.log(Number + 'Number')

  // conditional function to return certain text on background images
  function backgroundImageText() {
    if ((backgroundImageNumber + 1) % backgroundImages.length == 1)
      return (
        <>
          <h1 className="BackgroundHeader">
            Discover with MusicCloud!
          </h1>
          <h2 className="BackgroundHeaderTwo">
            Save tracks, follow artists and build playlists
          </h2>
          <h1 className="BackgroundHeader">All for free</h1>
          <h2 className="BackgroundHeaderTwo">Sign up and connect</h2>
          <div className="CreateAccountButtonHomePage">
            <SignUpModal className='SignUpButtonHomePage' />
          </div>
          <div className="SignInHomePage">
              <h4 className="backgroundImageText">already have an account?</h4>
              <div className="signinbutton">
                <LoginFormModal />
              </div>
            </div>
        </>
      );
    else return (
      <>
      <h1 className="BackgroundHeader">
      What's next in music is first on MusicCloud
          </h1>
          <p className="BackgroundText">Upload your first track and begin your journey. SoundCloud gives you space to create and connect with other artists.</p>
          <h2 className="BackgroundHeader">Sign up and connect</h2>
          <div className="CreateAccountButtonHomePage">
            <SignUpModal />
          </div>
      </>
    )
  }



  if (UserSignedIn) {
    return (
      <div className="homePage">
        <h1>Welcome back {UserSignedIn.username}!</h1>
        <div className="CarouselImages">
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
          })}
          {/* <img className='imagesArray' src={ImagesArray[imageNumber].image} alt='images'/> */}
        </div>

        {/* search bar */}
        <div className="headers">
          {/* SearchBar */}
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
          {/* Or upload your own
          <button>Upload</button> */}

          <div
            className={
              titleFiltered.length ? "Trendingsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
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
                    <div className="TrendingsongId">Song id: {song.id}</div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <div className="TrendingsongDescription">
                      Description: {song.description}
                    </div>
                    <div className="TrendinguserId">User: {song.userId}</div>
                    <div className="TrendingalbumId">Album: {song.albumId}</div>

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

          {/* trending songs */}

          <h1>This song is trending!</h1>
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
                    <div>Song id: {song.id}</div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <div className="TrendingsongDescription">
                      Description: {song.description}
                    </div>
                    <div className="TrendinguserId">User: {song.userId}</div>
                    <div className="TrendingalbumId">Album: {song.albumId}</div>

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

          <h1>Thanks for listening!</h1>
        </div>
      </div>
    );
  }
  //   if user isnt signed in
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
          {/* SearchBar */}
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
          {/* Or upload your own
          <button>Upload</button> */}

          <div
            className={
              titleFiltered.length ? "Trendingsong-container" : "HiddenResult"
            }
          >
            {/* search return map */}
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
                    <div className="TrendingsongId">Song id: {song.id}</div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <div className="TrendingsongDescription">
                      Description: {song.description}
                    </div>
                    <div className="TrendinguserId">User: {song.userId}</div>
                    <div className="TrendingalbumId">Album: {song.albumId}</div>

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

          {/* trending songs */}

          <h1>This song is trending!</h1>
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
                    <div>Song id: {song.id}</div>
                    <img
                      className="TrendingsongImage"
                      src={song.imageUrl}
                    ></img>
                    <div className="TrendingsongDescription">
                      Description: {song.description}
                    </div>
                    <div className="TrendinguserId">User: {song.userId}</div>
                    <div className="TrendingalbumId">Album: {song.albumId}</div>

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

          <h1>Thanks for listening!</h1>
        </div>
      </div>
    );
  }
}
