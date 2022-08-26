import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {DeleteASong} from "../../store/songs";
import { useHistory } from "react-router-dom";

import './CreateSong.css'

function DeleteSong({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory()
  // const {songId} = useParams()
  const user = useSelector(state => state.session.user)
  const song = useSelector(state => state.song)
  const songId = useSelector(state => state.song.id)


  const handleSubmit = () => {
     dispatch(DeleteASong(songId)).then((response) => {
      setShowModal(false)
      history.push('/songs')
     })
      // const response = dispatch(DeleteASong(songId)).then
      // setShowModal(false)
      // history.push('/songs')
      // return response
        }

  return (
    <div className="DeleteSong-outer">

    <form className="DeleteSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <p>Warning! This will permanently remove {song.title} from your library.</p>
        <div></div>
       <p>Are you sure you want to delete?</p>
       <div className="deleteSongButtons">
      <button className="submitDeleteSong" type="submit">Delete song</button>
      <button className='cancelDeleteSong' onClick={() => setShowModal(false)}>Cancel</button>
       </div>
    </form>
          </div>
  );
}

export default DeleteSong;
