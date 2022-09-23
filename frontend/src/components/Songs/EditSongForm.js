import React, { useState, useEffect} from "react";
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

  useEffect(() => {
    const formValidationErrors = [];
    const urlEnd = url.slice(-6)

    if (!urlEnd.includes('.mp3')) {formValidationErrors.push('Song must link to an mp3 file')}
    if (title.length > 256) {formValidationErrors.push('Song title must be fewer than 256 characters')}
    if (title.length < 1) {formValidationErrors.push('Title required')}
    if (description.length < 1) {formValidationErrors.push('Description required')}
    if (description.length > 256) {formValidationErrors.push('Description must be fewer than 256 characters')}
    if (!user) {formValidationErrors.push('User must be signed in')}

    setErrors(formValidationErrors)
  }, [url, title, description])


  const handleSubmit =  (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      setShowModal(false);
      return dispatch(
        EditASong({ id, title, description, url, imageUrl })
      ).catch(async (res) => {
        // console.log(res + 'this is res')
        const data = await res.json();
        // console.log(data + 'this is data')
        if (data && data.errors) setErrors(data.errors);
        // console.log(data.errors + 'this is dataerrors')
        // console.log(setErrors + 'this is setErrors')
      });
    }
    return errors
  };



  return (
    <div className="EditSong-outer" key={song}>

    <form className="EditSong-inner" onSubmit={handleSubmit} autoComplete='off'>
    {errors.length > 0 && (
          <div className="HeaderErrorStyling">
            <ul className="UlBulletErrorStyling">
              {errors.map((error, idx) => (
                <li className="ErrorPoints" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
    )}
      <h1 className="CreateSongHeader">Edit song</h1>
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
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          />
      </label>
      <label>
        <input
        className="imageUrlEditSong"
          placeholder={imageUrl || "Song Image Url (optional)..."}
          type="text"
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
