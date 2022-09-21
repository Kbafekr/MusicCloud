import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateASong, songsReducer } from "../../store/songs";
import { useHistory } from "react-router-dom";
import './CreateSong.css'

import { getAllAlbums } from '../../store/albums';

function CreateSong({setShowModal}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const albums = useSelector(state => state.album)
  const AlbumsArray = Object.values(albums)

  const [albumId, setAlbumId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState([]);

  // const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllAlbums())
 }, [dispatch])

 let myAlbumsFilter = AlbumsArray.filter((filteredAlbums, index) => filteredAlbums.userId == user.id)

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if (user){
      setShowModal(false)
      return dispatch(CreateASong({ albumId, title, description, url, imageUrl }))
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
    return setErrors(['User must be signed in to create song']);
    }


  return (
    <div className="CreateSong-outer">

    <form className="CreateSong-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Create a song</h1>
      <label>Select an Album...</label>
        <select
        className="albumIdInputCreateSong"
        autoComplete="off"
          placeholder="AlbumId (must belong to user)..."
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
          >
            {myAlbumsFilter &&
                myAlbumsFilter.map((album) => {
                return (
                  <option value={album.id} key={album.id}>{album.name}</option>
                )})}
            </select>
      <label>Song Title</label>
        <input
        className="titleInputCreateSong"
        placeholder="Title..."
        autoComplete="off"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          />
      <label>Song Description</label>
        <input
        className="descriptionCreateSong"
        placeholder="description..."
        type="text"
        autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
      <label>Song mp3 Link</label>
        <input
        className="urlCreateSong"
          placeholder="Audio Url (required)..."
          autoComplete="off"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          />
      <label>Song Image Link</label>
        <input
        className="imageUrlCreateSong"
          placeholder="Song Image Url (optional)..."
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      <div className="createSongButtons">
      <button className="submitCreateSong" type="submit">Submit new song</button>
      <button className='cancelCreateSong' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
          </div>
  );
}

export default CreateSong;
