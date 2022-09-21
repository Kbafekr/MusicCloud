//audio player to be retained by state
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
//css to import for audio player
import "./AudioPlayer.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SongPlayer() {
  const [songSource, setSongSource] = useState("");
  const [showThumbnail, setShowThumbnail] = useState(true);
  const currentSong = useSelector((state) => state.songPlayer);
  // const currentPlayingSong = Object.values(currentSong)
  // console.log(currentPlayingSong + 'sf')

  useEffect(() => {
    if (currentSong) {
      setSongSource(currentSong.url);
      // console.log('this is current song' + currentSong)
      // console.log('this is song source' + songSource)
    }
  }, [currentSong]);

  const toggleThumbnail = () => {
    setShowThumbnail((previousState) => !previousState);
  };

  function displayThumbnail() {
    if (showThumbnail === true) {
      return <button onClick={toggleThumbnail}>Close</button>;
    } else {
      return <button onClick={toggleThumbnail}>Open</button>;
    }
  }
  return (
    <>
      <div
        className={currentSong.url ? "currentSongThumbnail" : "NoThumbnail"}
        id={showThumbnail == true ? "closeThumbnail" : "openThumbnail"}
      >
        <div className="ThumbnailContainerPlaying">
          <div className="NowPlayingContainer">
            <div className="nowPlaying">Now Playing...</div>
            {displayThumbnail()}
          </div>
          <img
            className="currentSongThumbnailImage"
            src={currentSong.imageUrl}
          />
          <div className="linkContainerModal">
            <NavLink
              className="CurrentSongThumbNailLinkHome"
              to={`/songs/${currentSong.id}`}
            >
              {currentSong.title}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="AudioPlayerState">
        <AudioPlayer
          autoPlay={false}
          src={songSource}
          // muted={true}
          onPlay={(e) => console.log("onPlay")}
        />
      </div>
    </>
  );
}
