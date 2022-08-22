import { csrfFetch } from './csrf';

// constant type keys

const GET_ALL_SONGS = 'songs/getAllSongs'



//actions

const getSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}


//action thunk creators

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs')
    if (response.ok) {
        const allSongs = await response.json()
        dispatch(getSongs(allSongs))
        return response
    }
}

//initial state

const initialState = {}

//create reducer

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SONGS:
            const allSongs = {};
            action.songs.foreach(song => {
                allSongs[song.id] = song
            })
                return allSongs
            default:
                return state
    }
}

//export reducer
