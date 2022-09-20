import { csrfFetch } from './csrf';

// constant type keys



const PLAYING_SONG = 'AudioPlayer/TrendingSong'


//actions

//get all songs action
export const actionSongPlaying = (song) => {
    return {
        type: PLAYING_SONG,
        song
    }
}


//action thunk creators

//get currently playing song

// export const thunkSongPlaying = () => async dispatch => {
//     const response = await csrfFetch('/api/songs')
//     if (response.ok) {
//         const song = await response.json()
//         await dispatch(actionSongPlaying(song))
//     }
// }

//initial state

const initialState = {}

//create reducer

export const audioReducer = (state = initialState, action) => {
    switch (action.type) {

        case PLAYING_SONG: {
            const newState = {...action.song};
            // newState[action.song.id] = action.song
            return newState

            // const newState = {};
            // newState[action.song.albumId] = action.song.albumId
            // newState[action.song.createdAt] = action.song.createdAt
            // newState[action.song.description] = action.song.description
            // newState[action.song.id] = action.song.id
            // newState[action.song.imageUrl] = action.song.imageUrl
            // newState[action.song.title] = action.song.title
            // newState[action.song.url] = action.song.url
            // newState[action.song.userId] = action.song.userId
            // return newState

            // const newState = {...state};
            // newState[action.song.id] = action.song
            // return newState
        }
        default:
            return state
    }
}


//export reducer
