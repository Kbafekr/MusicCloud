import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


function DeleteComment({setModalDeleteComments, comment}) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
        await dispatch(deleteComment(comment.id))
        setModalDeleteComments(false)

  }

  return (
    <div className="DeleteSong-outer">

    <form className="DeleteSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <h1>Warning! This will permanently remove
          the comment.</h1>
        <div></div>
       <h2>Are you sure you want to delete?</h2>
       <div className="deleteSongButtons">
      <button className="submitDeleteSong" type="submit">Delete comment</button>
      <button className='cancelDeleteSong' onClick={() => setModalDeleteComments(false)}>Cancel</button>
       </div>
    </form>
          </div>
  );
}

export default DeleteComment;
