import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAComment } from "../../store/comments";
import { useParams } from "react-router-dom";


function CreateComment({ setShowModal }) {
    const {songId} = useParams()
  const dispatch = useDispatch();


  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);


  // const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const formValidationErrors = [];

    if (comment.length > 100) {
      formValidationErrors.push("Comment body must be no more than 100 characters");
    }
    if (comment.length < 1) {
      formValidationErrors.push("Comment body must be more than 1 character");
    }


    setErrors(formValidationErrors);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      setShowModal(false);
      return dispatch(
        createAComment({ songId, comment })
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
    <div className="CreateComment-outer">
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
        <h1 className="CreateSongHeader">Create a Comment</h1>
        <label className="CreateSongLabel">Comment Description (Required)</label>
        <input
          className="descriptionCreateSong"
          placeholder="comment..."
          type="text"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="createSongButtons">
          <button className="submitCreateSong" type="submit">
            Submit new comment
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

export default CreateComment;
