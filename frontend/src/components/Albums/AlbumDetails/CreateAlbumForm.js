import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAnAlbum } from "../../../store/albums";
import { useHistory } from "react-router-dom";
import './CreateAlbum.css'

function CreateAlbum({setShowModal}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState([]);




  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if (user){
      setShowModal(false)
      return dispatch(CreateAnAlbum({title, description, imageUrl }))
      .catch(async (res) => {
        // console.log(res + 'this is res')
        const data = await res.json();
        // console.log(data + 'this is data')
        if (data && data.errors) setErrors(data.errors);
        // console.log(data.errors + 'this is dataerrors')
        // console.log(setErrors + 'this is setErrors')
        alert('Request denied. User does not own album.')

      });
    }
    return setErrors(['User must be signed in to create album']);
    }


  return (
    <div className="CreateAlbum-outer">

    <form className="CreateAlbum-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Create an album</h1>
      <label>
        <input
        className="titleInputCreateAlbum"
        autoComplete="off"
          placeholder="title..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="descriptionCreateAlbum"
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
        className="imageUrlCreateAlbum"
          placeholder="Album Image Url (optional)..."
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <div className="createAlbumButtons">
      <button className="submitCreateAlbum" type="submit">Submit new album</button>
      <button className='cancelCreateAlbum' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
          </div>
  );
}

export default CreateAlbum;
