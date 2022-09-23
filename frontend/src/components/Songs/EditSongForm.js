import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {EditASong } from "../../store/songs";
import { useParams } from "react-router-dom";
import './EditSong.css'

function EditSong({setShowModal}) {
  const dispatch = useDispatch();
  const { songId } = useParams();

  // const {songId} = useParams()

  const user = useSelector(state => state.session.user)
  const songs = useSelector((state) => state.song);

  const song = { ...songs[songId] };

  const [id, setId] = useState(song.id)
  const [title, setTitle] = useState(song.title)
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.imageUrl)
  const [errors, setErrors] = useState([]);

  //force modal close
  // const [showModal, setShowModal] = useState(false);



  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if(id){
      setShowModal(false)

      return dispatch(EditASong({id, title, description, url, imageUrl}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['User must be signed in to create song']);
  };



  return (
    <div className="EditSong-outer" key={song}>

    <form className="EditSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Edit song</h1>
      <label>
        <input
        className="titleInputEditSong"
        placeholder={title || "Title..."}
        autoComplete="off"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="descriptionEditSong"
        placeholder={description || 'description...'}
        type="text"
        autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="urlEditSong"
          placeholder={url || 'Audio Url (required)...'}
          autoComplete="off"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="imageUrlEditSong"
          placeholder={imageUrl || "Song Image Url (optional)..."}
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <div className="editSongButtons">
      <button className="submitEditSong" type="submit">Update song</button>
      <button className='cancelEditSong' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
          </div>
  );
}

export default EditSong;
