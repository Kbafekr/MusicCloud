import { csrfFetch } from './csrf';

// constant type keys

const GET_ALL_SONGS = 'songs/getAllSongs'

const GET_ONE_SONG = 'songs/getOneSong'

const CREATE_A_SONG = 'songs/CreateASong'

const EDIT_A_SONG = 'songs/EditASong'

const DELETE_A_SONG = 'songs/DeleteASong'




//actions

//get all songs action
const actionGetSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

//get one song action
const actionGetOneSong = (song) => {
    return {
        type: GET_ONE_SONG,
        song
    }
}

//create a song
const actionCreateASong = (song) => {
    return {
        type: CREATE_A_SONG,
        song
    }
}

//edit a song
const actionEditASong = (song) => {
    return {
        type: EDIT_A_SONG,
        song
    }
}

//delete a song
const actionDeleteASong = (songId) => {
    return {
        type: DELETE_A_SONG,
        songId
    }
}


//action thunk creators

//get all songs

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs')
    if (response.ok) {
        const allSongs = await response.json()
        await dispatch(actionGetSongs(allSongs.Songs))
    }
}


//initial state


const initialState = {}

//create reducer

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SONGS:
            const newState = {...state.songs};
            action.songs.forEach(song => {
                newState[song.id] = song
            })
                return newState
            default:
                return state
    }
}

//export reducer
