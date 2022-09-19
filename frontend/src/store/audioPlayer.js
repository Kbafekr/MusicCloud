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
            const newState = {};
            newState[action.song.url] = action.song.url
            return newState

            // const newState = {...state.songs};

            // action.songs.forEach(song => {
            //     newState[song.id] = song
            // })
            // return newState
        }
        default:
            return state
    }
}


//export reducer
