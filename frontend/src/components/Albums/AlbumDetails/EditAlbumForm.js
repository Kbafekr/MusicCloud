import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditAnAlbum } from "../../../store/albums";
import './EditAlbum.css'

function EditAlbum({setShowModal}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const album = useSelector(state => state.album)

  const [id, setId] = useState(album.id)
  const [title, setTitle] = useState(album.title)
  const [description, setDescription] = useState(album.description);
  const [imageUrl, setImageUrl] = useState(album.imageUrl)
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if(user){
      setShowModal(false)

      return dispatch(EditAnAlbum({id, title, description, imageUrl}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['User must be signed in to create song']);
  };



  return (
    <div className="EditAlbum-outer" key={album}>

    <form className="EditAlbum-inner" onSubmit={handleSubmit} autoComplete='off'>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <h1>Edit album</h1>
      <label>
        <input
        className="titleInputEditAlbum"
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
        className="descriptionInputEditAlbum"
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
        className="imageUrlEditAlbum"
          placeholder={imageUrl || "Song Image Url (optional)..."}
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          />
      </label>
      <button className="submitEditAlbum" type="submit">Update album</button>
      <button className='cancelEditAlbum' onClick={() => setShowModal(false)}>Cancel</button>
    </form>
          </div>
  );
}

export default EditAlbum;
