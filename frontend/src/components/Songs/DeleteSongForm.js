import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {DeleteASong} from "../../store/songs";
import { useHistory } from "react-router-dom";

import './DeleteSong.css'

function DeleteSong({setModalDelete}) {
  const dispatch = useDispatch();
  const history = useHistory()
  // const {songId} = useParams()
  const user = useSelector(state => state.session.user)
  const song = useSelector(state => state.song)
  const songId = useSelector(state => state.song.id)


  const handleSubmit = async (e) => {
    e.preventDefault()
        await dispatch(DeleteASong(songId))
        setModalDelete(false)
        history.push('/songs')
  }


  // await dispatch(DeleteASong(songId)).then((response) => {
  //   history.push('/songs')
  //   setModalDelete(false)
  //       }

  return (
    <div className="DeleteSong-outer">

    <form className="DeleteSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <h1>Warning! This will permanently remove {song.title} from your library.</h1>
        <div></div>
       <h2>Are you sure you want to delete?</h2>
       <div className="deleteSongButtons">
      <button className="submitDeleteSong" type="submit">Delete song</button>
      <button className='cancelDeleteSong' onClick={() => setModalDelete(false)}>Cancel</button>
       </div>
    </form>
          </div>
  );
}

export default DeleteSong;
