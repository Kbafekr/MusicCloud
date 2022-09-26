import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAComment } from "../../store/comments";
import { useHistory } from "react-router-dom";

import { getAllAlbums } from "../../store/albums";

function createAComment({ setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments);

  const [albumId, setAlbumId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [submittedForm, setSubmittedForm] = useState(false);

  // const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  let myAlbumsFilter = AlbumsArray.filter(
    (filteredAlbums, index) => filteredAlbums.userId == user.id
  );

  useEffect(() => {
    const formValidationErrors = [];
    const urlEnd = url.slice(-6);

    if (!urlEnd.includes(".mp3")) {
      formValidationErrors.push("Song must link to an mp3 file");
    }
    if (title.length > 256) {
      formValidationErrors.push("Song title must be no more than 256 characters");
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
  }, [url, title, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedForm(true);
    if (errors.length <= 0) {
      setShowModal(false);
      return dispatch(
        CreateASong({ albumId, title, description, url, imageUrl })
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

  return (
    <div className="CreateSong-outer">
      <form
        className="CreateSong-inner"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
        <h1 className="CreateSongHeader">Create a song</h1>
        <label className="CreateSongLabel">Select an Album...</label>
        <div className="SelectAlbumsCreateSongContainer">
          <select
            className="albumIdInputCreateSong"
            id="albumSelectCreateSong"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
          >
            <option selected disabled value="">
              Select an Album...
            </option>
            {myAlbumsFilter &&
              myAlbumsFilter.map((album) => {
                return (
                  <option
                    className="OptionsAlbumsDropdown"
                    value={album.id}
                    key={album.id}
                  >
                    {album.title}
                  </option>
                );
              })}
          </select>
        </div>
        <label className="CreateSongLabel">Song Title (Required)</label>
        <input
          className="titleInputCreateSong"
          placeholder="Title..."
          autoComplete="off"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="CreateSongLabel">Song Description (Required)</label>
        <input
          className="descriptionCreateSong"
          placeholder="description..."
          type="text"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="CreateSongLabel">Song MP3 Link (Required)</label>
        <input
          className="urlCreateSong"
          placeholder="Audio Url (required)..."
          autoComplete="off"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <label className="CreateSongLabel">Song Image Link (Optional)</label>
        <input
          className="imageUrlCreateSong"
          placeholder="Song Image Url (optional)..."
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className="createSongButtons">
          <button className="submitCreateSong" type="submit">
            Submit new song
          </button>
          <button
            className="cancelCreateSong"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSong;
