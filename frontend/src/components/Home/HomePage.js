import "./HomePage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ImagesArray } from "../../images/Images";
import { backgroundImages } from "../../images/Images";

import SignUpModal from "../SignUpModal";
import LoginFormModal from "../LoginFormModal";
import LoginAsDemo from "../LoginDemoUser";
export function HomePage() {
  const UserSignedIn = useSelector((state) => state.session.user);

  const [imageNumber, setImageNumber] = useState(0);
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);

  //prevents counter from updating after every single render
  useEffect(() => {
    if (!UserSignedIn) {
      if (backgroundImageNumber < backgroundImages.length) {
        const backgroundImageTransition = setInterval(() => {
          //check to see if previous number is greater than images array length, if not then
          setBackgroundImageNumber(
            (previousBackgroundImageNumber) =>
              (previousBackgroundImageNumber + 1) % backgroundImages.length
          );
        }, 5000);

        return () => clearInterval(backgroundImageTransition);
      } else {
        setBackgroundImageNumber(0);
      }
    }

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
  }, [imageNumber, backgroundImageNumber]);

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

        <div className="headers">
          <h1>
            Insert search bar for tracks and artists & signin button that
            redirects to songs page
          </h1>

          <h1>Here's whats trending in the MusicCloud Community</h1>
          <h2>add 'explore trending playlists' button</h2>

          <h1>Thanks for listening!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="homePage">
        <div className="CarouselImages">
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
          <div className="foregroundContainer">
            <h1 className="BackgroundHeader">
            Save tracks, follow artists and build playlists.
            </h1>
            <h1 className="BackgroundHeader">
              All for free
            </h1>
            <h2 className="BackgroundHeader">
              Sign up and connect
            </h2>
            <div className="CreateAccountButtonHomePage">
              <SignUpModal />
            </div>
            <div className="SignInHomePage">
              <h4 className="backgroundImageText">already have an account?</h4>
              <div className="signinbutton">
                <LoginFormModal />
              </div>
            </div>
          </div>
          {/* <img className='imagesArray' src={ImagesArray[imageNumber].image} alt='images'/> */}
        </div>
          <div className="containerForDemoSection">
            <h2 className="DemoHeader">Want to look around first?</h2>
            <div className="demoContainerHome">
              <h3>Sign in as a</h3>
              <div className="DemoUserHomePage">
                <LoginAsDemo id="DemoUserHomePage" />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
