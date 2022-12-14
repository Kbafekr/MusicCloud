import { csrfFetch } from './csrf';

// constant type keys

const GET_ALL_SONGS = 'songs/getAllSongs'

const GET_ONE_SONG = 'songs/getOneSong'

const CREATE_A_SONG = 'songs/CreateASong'

const EDIT_A_SONG = 'songs/EditASong'

const DELETE_A_SONG = 'songs/DeleteASong'

const GET_OWNED_SONGS = 'songs/GetOwnedSongs'

const TRENDING_SONG = 'songs/TrendingSong'


//actions

//get all songs action
export const actionGetSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

//get owned songs action
const actionGetOwnedSongs = (songs) => {
    return {
        type: GET_OWNED_SONGS,
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

//get trending song action

const actionTrendingSong = (song) => {
    return {
        type: TRENDING_SONG,
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
        await dispatch(actionGetSongs(allSongs))
    }
}





//get all songs by page

export const getAllSongsWithPage = (page) => async dispatch => {
    const response = await csrfFetch(`/api/songs?page=${page}`)
    if (response.ok) {
        const allSongs = await response.json()
        await dispatch(actionGetSongs(allSongs))
    }





}
//get all songs no validation

export const getAllDemoSongs = () => async dispatch => {
    const response = await fetch('/api/songs/Demo')
    if (response.ok) {
        const allSongs = await response.json()
        await dispatch(actionGetSongs(allSongs))
    }
}

//get all songs owned by current user

export const UserSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs/current')
    if (response.ok) {
        const ownedSongs = await response.json()
        await dispatch(actionGetOwnedSongs(ownedSongs))
        return ownedSongs
    }
}

//get one song thunk
export const getOneSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`)
    if (response.ok) {
        const OneSong = await response.json()
        await dispatch(actionGetOneSong(OneSong))
    }
}


//trending song thunk

export const getTrendingSong = (song) => async dispatch => {
    const response = await csrfFetch('/api/songs')
    if (response.ok) {
        const allSongs = await response.json()
        await dispatch(actionTrendingSong(allSongs))
    }
}
//create a song thunk

export const CreateASong = (song) => async dispatch => {
    const response = await csrfFetch('/api/songs/', {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: song
})
    if (response.ok) {
        const newSong = await response.json()
        await dispatch(actionCreateASong(newSong))
    }
}

//edit a song thunk

export const EditASong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(song)
})
    if (response.ok) {
        const songEdit = await response.json()
        await dispatch(actionEditASong(songEdit))
    }
}
//delete a song thunk

export const DeleteASong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
    method: 'Delete',
})
    if (response.ok) {
        const songDelete = await response.json()
        await dispatch(actionDeleteASong(songId))
        return songDelete
    }
}




//initial state

const initialState = {}

//create reducer

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_SONGS: {
            const newState = {};

            action.songs.Songs.forEach(song => {
                newState[song.id] = song
            })
            return newState

            // const newState = {...state.songs};

            // action.songs.forEach(song => {
            //     newState[song.id] = song
            // })
            // return newState
        }
        case GET_OWNED_SONGS: {
            const newState = {};
            action.songs.Songs.forEach(song => {
                newState[song.id] = song
            })
            return newState

            // const newState = {...state.songs};
            // action.songs.songs.forEach(song => {
            //     newState[song.id] = song
            // })
            // return newState
        }

        case GET_ONE_SONG: {
            const newState = {...action.song}
            //normalize nested components into state
            // newState.AlbumId = action.song.Album.id
            // newState.AlbumTitle = action.song.Album.title
            // newState.AlbumImageUrl = action.song.Album.imageUrl
            // newState.ArtistId = action.song.Artist.id
            // newState.ArtistUsername = action.song.Artist.username
            // newState.ArtistProfilePic = action.song.Artist.imageUrl
            return newState
        }
        case CREATE_A_SONG: {
            const newState = {...state}
            newState[action.song.id] = action.song
            return newState
        }
        case EDIT_A_SONG:
            {   const newState = {...state}
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

                newState[action.song.id] = action.song;
                return newState;
            }
        case DELETE_A_SONG:
            {
                const newState = {...state}
                delete newState[action.id]
                return newState
            }
        case TRENDING_SONG:
            const newState = {...state}
            return newState
        default:
            return state
    }
}


//export reducer
