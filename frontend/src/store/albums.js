import { csrfFetch } from './csrf';

// constant type keys

const GET_ALL_ALBUMS = 'albums/getAllAlbums'

const GET_ONE_ALBUM = 'albums/getOneAlbum'

const CREATE_AN_ALBUM = 'albums/CreateAnAlbum'

const EDIT_AN_ALBUM = 'albums/EditAnAlbum'

const DELETE_AN_ALBUM = 'albums/DeleteAnAlbum'

const GET_OWNED_ALBUMS = 'albums/GetOwnedAlbums'




//actions

//get all albums action
const actionGetAlbums = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}

//get owned albums action
const actionGetOwnedAlbums = (albums) => {
    return {
        type: GET_OWNED_ALBUMS,
        albums
    }
}
//get one album action
const actionGetOneAlbum = (album) => {
    return {
        type: GET_ONE_ALBUM,
        album
    }
}

//create an album
const actionCreateAnAlbum = (album) => {
    return {
        type: CREATE_AN_ALBUM,
        album
    }
}

//edit an album
const actionEditAnAlbum = (album) => {
    return {
        type: EDIT_AN_ALBUM,
        album
    }
}

//delete an album
const actionDeleteAnAlbum = (albumId) => {
    return {
        type: DELETE_AN_ALBUM,
        albumId
    }
}


//action thunk creators

//get all albums

export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums')
    if (response.ok) {
        const allAlbums = await response.json()
        await dispatch(actionGetAlbums(allAlbums))
    }
}

//get all albums owned by current user

export const UserAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums/current')
    if (response.ok) {
        const ownedAlbums = await response.json()
        await dispatch(actionGetOwnedAlbums(ownedAlbums))
        return ownedAlbums
    }
}

//get one album thunk
export const getOneAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`)
    if (response.ok) {
        const OneAlbum = await response.json()
        await dispatch(actionGetOneAlbum(OneAlbum))
    }
}

//create an album thunk

export const CreateAnAlbum = (album) => async dispatch => {
    const response = await csrfFetch('/api/albums/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(album)
})
    if (response.ok) {
        const newAlbum = await response.json()
        await dispatch(actionCreateAnAlbum(newAlbum))
    }
}

//edit an album thunk

export const EditAnAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(album)
})
    if (response.ok) {
        const albumEdit = await response.json()
        await dispatch(actionEditAnAlbum(albumEdit))
    }
}
//delete a song thunk

export const DeleteAnAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'Delete',
})
    if (response.ok) {
        const albumDelete = await response.json()
        await dispatch(actionDeleteAnAlbum(albumId))
        return albumDelete
    }
}




//initial state

const initialState = {}

//create reducer

export const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ALBUMS: {
            const newState = {};

            action.albums.Albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }
        case GET_OWNED_ALBUMS: {
            const newState = {};
            action.albums.Albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }

        case GET_ONE_ALBUM: {
            const newState = {...action.album}
            //normalize nested components into state

            // newState.AlbumId = action.song.Album.id
            // newState.AlbumTitle = action.song.Album.title
            // newState.AlbumImageUrl = action.song.Album.imageUrl
            // newState.ArtistId = action.song.Artist.id
            // newState.ArtistUsername = action.song.Artist.username
            // newState.ArtistProfilePic = action.song.Artist.imageUrl

            return newState
        }
        case CREATE_AN_ALBUM: {
            const newState = {...state}
            newState[action.album.id] = action.album
            return newState
        }
        case EDIT_AN_ALBUM:
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
                newState[action.album.id] = action.album
                // return newState[action.album.id];
                return newState
            }
        case DELETE_AN_ALBUM:
            {
                const newState = {...state}
                delete newState[action.id]
                return newState
            }
        default:
            return state
    }
}


//export reducer
