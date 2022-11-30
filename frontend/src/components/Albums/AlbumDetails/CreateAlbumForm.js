import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAnAlbum } from "../../../store/albums";
import { useHistory } from "react-router-dom";
import './CreateAlbum.css'

function CreateAlbum({setShowModal}) {
  const dispatch = useDispatch();
  const allowedImageFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  const user = useSelector(state => state.session.user)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const formValidationErrors = [];

    if (!allowedImageFileTypes.includes(imageUrl?.type) && imageUrl != "")
      formValidationErrors.push("Only JPEG, JPG and PNG image files allowed");
    if (imageUrl?.size > 5000000  && imageUrl != "")
      formValidationErrors.push("Image must be smaller than 5MB");
    if (title.length > 256) {
      formValidationErrors.push("Title must be no more than 256 characters");
    }
    if (title.length < 1) {
      formValidationErrors.push("Title required");
    }
    if (description.length < 1) {
      formValidationErrors.push("Description required");
    }
    if (description.length > 256) {
      formValidationErrors.push("Description must be no more than 256 characters");
    }
    if (!user) {
      formValidationErrors.push("User must be signed in");
    }

    setErrors(formValidationErrors);
  }, [title, description, imageUrl]);




  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors([]);
    if (errors.length <= 0) {
      setShowModal(false);
      const formData = new FormData()
      formData.append("title", title);
      formData.append("description", description);
      formData.append("imageUrl", imageUrl);
      return dispatch(
        CreateAnAlbum(formData)
      ).catch(async (res) => {
        // console.log(res + 'this is res')
        const data = await res.json();
        // console.log(data + 'this is data')
        if (data && data.errors) setErrors(data.errors);
        // console.log(data.errors + 'this is dataerrors')
        // console.log(setErrors + 'this is setErrors')
      });
    }
    return errors;
  };

  const imageSet = (e) => {
    const imageFile = e.target.files[0];
    setImageUrl(imageFile);
  };

  return (
    <div className="CreateAlbum-outer">

    <form className="CreateAlbum-inner" onSubmit={handleSubmit} autoComplete='off'>
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
      <h1 className="CreateSongHeader">Create an album</h1>
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
      <label className="CreateSongLabel">Album Image File (Optional)</label>
        <input
        className="urlCreateSong"
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={imageSet}
          />
      <div className="createAlbumButtons">
      <button className="submitCreateAlbum" type="submit">Submit new album</button>
      <button className='cancelCreateAlbum' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
          </div>
  );
}

export default CreateAlbum;
