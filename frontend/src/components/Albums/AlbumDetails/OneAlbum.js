import React, { useEffect } from "react";
import { getOneAlbum } from "../../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./OneAlbum.css";

// import EditSongModal from './EditFormIndex';
// import DeleteSongModal from './DeleteFormIndex';

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

//get one album, dispatch thunk action creator
export default function AlbumDetails() {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const album = useSelector((state) => state.album);
  //   console.log(song)
  //   const Albumvalues = Object.values(song.Album)
  //   console.log(Albumvalues)
  //   const Artist = useSelector(state => state.song.Artist)

  useEffect(() => {
    dispatch(getOneAlbum(albumId));
  }, [])
    // dispatch, album.Artist, album.Songs]);
  //  [dispatch, song.description, song.title, song.imageUrl, song.AlbumId, song.url])

  if (!albumId) {
    return <h1>Whomp Whomp</h1>;
  }

    if (album.Artist && album.Songs) {
     return (
    <div className="album-details-container">
      {/* <div className='EditSongForm'>
        <EditSongModal />
      </div>
      <div className='DeleteSongModal'>
        <DeleteSongModal />
      </div> */}
      <div className="album-container">
        <div className="albumKey" key={albumId}>
          <img className="albumImage" src={album.imageUrl}></img>
          <div className="albumDescription">
            Description: {album.description}
          </div>
        </div>
      </div>

        <div className="Artist-container">
        <div key={album.Artist.id}className="artistId">Artist: {album.userId}</div>
        <div className="artistUsername">
        Artist Username: {album.Artist.username}
        </div>
        <img className="artistProfilePic" src={album.Artist.imageUrl} />
        </div>

      <div className="Songs-container">
        {album.Songs.map((song) => {
          return (
            <div key={song.id} className="song">
              <NavLink className="songLink" to={`/songs/${song.id}`}>
                {song.title}
              </NavLink>
              <img className="songImage" src={song.imageUrl} />
              <div className="songDescription">
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
else  return (
  <div className="album-details-container">
    {/* <div className='EditSongForm'>
      <EditSongModal />
    </div>
    <div className='DeleteSongModal'>
      <DeleteSongModal />
    </div> */}
    <div className="album-container">
      <div className="albumKey" key={albumId}>
        <img className="albumImage" src={album.imageUrl}></img>
        <div className="albumDescription">
          Description: {album.description}
        </div>
      </div>
    </div>
  </div>
    )
}
