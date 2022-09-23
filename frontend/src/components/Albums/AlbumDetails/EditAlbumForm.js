import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditAnAlbum } from "../../../store/albums";
import './EditAlbum.css'

function EditAlbum({setShowModal}) {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const albums = useSelector((state) => state.album);

  const album = {...albums[albumId]}

  const [id, setId] = useState(album.id)
  const [title, setTitle] = useState(album.title)
  const [description, setDescription] = useState(album.description);
  const [imageUrl, setImageUrl] = useState(album.imageUrl)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (title.length > 256) {formValidationErrors.push('Title must be no more than 256 characters')}
    if (title.length < 1) {formValidationErrors.push('Title required')}
    if (description.length < 1) {formValidationErrors.push('Description required')}
    if (description.length > 256) {formValidationErrors.push('Description must be no more than 256 characters')}
    if (!user) {formValidationErrors.push('User must be signed in')}

    setErrors(formValidationErrors)
  }, [title, description])

  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if (errors.length <= 0) {
      setShowModal(false);
      return dispatch(
        EditAnAlbum({id, title, description, imageUrl})
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
    <div className="EditAlbum-outer" key={album}>

    <form className="EditAlbum-inner" onSubmit={handleSubmit} autoComplete='off'>
    <div className="errorHandlingContainer">
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
        </div>
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
      <div className="editAlbumButtons">
      <button className="submitEditAlbum" type="submit">Update album</button>
      <button className='cancelEditAlbum' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
          </div>
  );
}

export default EditAlbum;
