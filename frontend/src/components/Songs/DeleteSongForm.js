import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DeleteASong} from "../../store/songs";
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";

import './CreateSong.css'

function DeleteSong({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory()
  // const {songId} = useParams()
  const user = useSelector(state => state.session.user)
  const song = useSelector(state => state.song)
  const songId = useSelector(state => state.song.id)


  console.log(songId + 'sdafsdfsdafsdfasdfsd')

  // const [isModalOpen, setModalOpen] = useState(false)



  const handleSubmit = async () => {
      const response = dispatch(DeleteASong(songId))
      setShowModal(false)
      history.push('/songs')
      return response
        }

  return (
    <div className="DeleteSong-outer">

    <form className="DeleteSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <p>Warning! This will permanently remove {song.title} from your library.</p>
        <div></div>
       <p>Are you sure you want to delete?</p>
      <button className="submitDeleteSong" type="submit">Delete song</button>
      <button className='cancelDeleteSong' onClick={() => setShowModal(false)}>Cancel</button>
    </form>
          </div>
  );
}

export default DeleteSong;
