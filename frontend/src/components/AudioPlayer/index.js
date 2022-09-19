//audio player to be retained by state
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
//css to import for audio player
import "./AudioPlayer.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SongPlayer() {
    const [songSource, setSongSource] = useState('')

    const currentSong = useSelector(state => state.songPlayer)
    const currentPlayingSong = Object.values(currentSong)
    // console.log(currentPlayingSong + 'current')

    useEffect(() => {
        if (currentSong) {
            setSongSource(currentPlayingSong)
            // console.log('this is current song' + currentSong)
            // console.log('this is song source' + songSource)
        }
    }, [currentSong])
    return (
        <>
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
