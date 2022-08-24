import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateASong, EditASong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import {useParams} from 'react-router-dom'

import './CreateSong.css'

function EditSong() {
  const dispatch = useDispatch();
  const history = useHistory()
  const {songId} = useParams()

  const user = useSelector(state => state.session.user)
  const song = useSelector(state => state.song)

  const [albumId, setAlbumId] = useState(song.albumId)
  const [title, setTitle] = useState(song.title)
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.imageUrl)
  const [errors, setErrors] = useState([]);

  //force modal close
  const [isModalOpen, setModalOpen] = useState(false)



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if(songId){
      const response = dispatch(EditASong({ id: songId, albumId, title, description, url, imageUrl }))
      //this will hard refresh do not do
      // history.go(0)
        return response
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    else {
      return dispatch(EditASong({ id: song.id, albumId, title, description, url, imageUrl }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['User must be signed in to create song']);
  };


  return (
    <div className="EditSong-outer">

    <form className="EditSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Edit song</h1>
      <label>
        <input
        className="albumIdInputEditSong"
        autoComplete="off"
          placeholder={albumId || "AlbumId (must belong to user)..."}
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
          />
      </label>
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
        className="descriptionCreateSong"
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
        className="urlCreateSong"
          placeholder={url || 'Audio Url...'}
          autoComplete="off"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="imageUrlCreateSong"
          placeholder={imageUrl || "Song Image Url (optional)..."}
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <button className="submitEditSong" type="submit">Update song</button>
      <button className='cancelEditSong' type='submit' onClick={() => setModalOpen(false)}>Cancel edit</button>
    </form>
          </div>
  );
}

export default EditSong;
