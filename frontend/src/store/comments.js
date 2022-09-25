import { csrfFetch } from "./csrf";

// constant type keys

const GET_ALL_COMMENTS = "comments/getAllComments";

const CREATE_A_COMMENT = "comments/CreateAComment";

const EDIT_A_COMMENT = "comments/EditAComment";

const DELETE_A_COMMENT = "songs/DeleteAComment";

//actions

//get all song comments action
export const actionGetComments = (songId) => {
  return {
    type: GET_ALL_COMMENTS,
    songId,
  };
};

//create a song
const actionCreateAComment = (songId, comment) => {
  return {
    type: CREATE_A_COMMENT,
    songId,
    comment
  };
};

//edit a song
const actionEditAComment = (comment) => {
  return {
    type: EDIT_A_COMMENT,
    comment,
  };
};

//delete a song
const actionDeleteAComment = (commentId) => {
  return {
    type: DELETE_A_COMMENT,
    commentId,
  };
};

//action thunk creators

//get all comments thunk

export const getAllComments = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`);
  if (response.ok) {
    const allComments = await response.json();
    await dispatch(actionGetComments(allComments));
  }
};

//create a comment thunk

export const createAComment = (songId, comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const newComment = await response.json();
    await dispatch(actionCreateAComment(newComment));
  }
};

//edit a comment thunk

export const editAComment = (comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const commentEdit = await response.json();
    await dispatch(actionEditAComment(commentEdit));
  }
};
//delete a comment thunk

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "Delete",
  });
  if (response.ok) {
    const commentDelete = await response.json();
    await dispatch(actionDeleteAComment(commentId));
    return commentDelete;
  }
};

//initial state

const initialState = {};

//create reducer

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS: {


      const newState = {...state}
      action.songId.Comments.forEach(comment => {
        newState[comment.id] = comment
    })
      return newState;
    }
    case CREATE_A_COMMENT: {
      const newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    }
    case EDIT_A_COMMENT: {
      const newState = { ...state };
      // console.log('this is newstate' + state)
      //     const data = {...action}
      // console.log('this is data' + data)
      // const songCopy = { ...state[action.song.id]}
      // newState[action.song.id] = songCopy
      // newState[action.song.id] = action.song
      //normalize nested components into state
      // newState[action.song.id.AlbumTitle] = newState.song.Album.title
      // newState[action.song.AlbumImageUrl] = newState.song.AlbumImageUrl
      // newState[action.song.ArtistId] = newState.song.ArtistId
      // newState[action.song.ArtistUsername] = newState.song.ArtistUsername
      // newState[action.song.ArtistProfilePic] = newState.song.ArtistProfilePic
      // return newState[action.song.id]

      newState[action.comment.id] = action.comment;
      return newState;
    }
    case DELETE_A_COMMENT: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

//export reducer
