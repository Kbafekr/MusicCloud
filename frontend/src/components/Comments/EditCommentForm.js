import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAComment } from "../../store/comments";
import { useParams } from "react-router-dom";

function EditComment({setShowModalComments, comment}) {
  const dispatch = useDispatch();

  const commentId = comment.id
  const user = useSelector(state => state.session.user)
  const comments = useSelector((state) => state.comments);

  const [body, setBody] = useState(comment.body);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const formValidationErrors = [];

    if (body.length > 100) {
      formValidationErrors.push("Comment body must be no more than 100 characters");
    }
    if (body.length < 1) {
      formValidationErrors.push("Comment body must be more than 1 character");
    }


    setErrors(formValidationErrors);
  }, [body]);

  const handleSubmit =  (e) => {
    e.preventDefault();
    setShowModalComments(false);
    if (errors.length <= 0) {
      return dispatch(
        editAComment({commentId, body})
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
        <h1 className="CreateSongHeader">Edit a Comment</h1>
        <label className="CreateSongLabel">Comment Description (Required)</label>
        <input
          className="descriptionCreateSong"
          placeholder="comment..."
          type="text"
          autoComplete="off"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div className="createSongButtons">
          <button className="submitCreateSong" type="submit">
            Submit comment
          </button>
          <button
            className="cancelCreateSong"
            onClick={() => setShowModalComments(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
