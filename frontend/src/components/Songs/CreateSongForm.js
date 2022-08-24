import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateASong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import './CreateSong.css'

function CreateSong() {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const [albumId, setAlbumId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false)



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if(user){
      const response =  dispatch(CreateASong({ albumId, title, description, url, imageUrl }))
      history.go(0)
        return response
    }
    return setErrors(['User must be signed in to create song']);
  };

  return (
    <div className="CreateSong-outer">

    <form className="CreateSong-inner" onClick={() => setModalOpen(true)} onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Create a song</h1>
      <label>
        <input
        className="albumIdInputCreateSong"
        autoComplete="off"
          placeholder="AlbumId..."
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="titleInputCreateSong"
        placeholder="Title..."
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
        placeholder="description..."
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
          placeholder="Audio Url..."
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
          placeholder="Song Image Url..."
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <button className="submitCreateSong" type="submit">Submit new song</button>
    </form>
          </div>
  );
}

export default CreateSong;
