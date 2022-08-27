import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAnAlbum } from "../../../store/albums";
import { useHistory } from "react-router-dom";

import './DeleteAlbum.css'
function DeleteAlbum({setModalDelete}) {
  const dispatch = useDispatch();
  const history = useHistory()
  // const {songId} = useParams()
  const user = useSelector(state => state.session.user)
  const album = useSelector(state => state.album)
  const albumId = useSelector(state => state.album.id)



  const handleSubmit = async (e) => {
      e.preventDefault()
        await dispatch(DeleteAnAlbum(albumId))
        setModalDelete(false)
        history.push('/albums')

  }
  // await dispatch(DeleteAnAlbum(albumId)).then((response) => {
  //   history.push('/albums')
  //   setModalDelete(false)


  return (
    <div className="DeleteAlbum-outer">

    <form className="DeleteAlbum-inner" onSubmit={handleSubmit} autoComplete='off'>
      <p>Warning! This will permanently remove {album.title} from your library.</p>
        <div></div>
       <p>Are you sure you want to delete?</p>
       <div className="deleteAlbumButtons">
      <button className="submitDeleteAlbum" type="submit">Delete album</button>
      <button className='cancelDeleteAlbum' onClick={() => setModalDelete(false)}>Cancel</button>
       </div>
    </form>
          </div>
  );
}

export default DeleteAlbum;
