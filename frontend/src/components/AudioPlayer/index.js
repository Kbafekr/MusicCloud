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
  return (
    <>

     <div className={currentSong.url ? "currentSongThumbnail" : "NoThumbnail"}>
          <NavLink className="CurrentSongThumbNailLinkHome" to={`/songs/${currentSong.id}`}>
            {currentSong.title}
          </NavLink>

          <img className="currentSongThumbnailImage" src={currentSong.imageUrl}></img>
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
