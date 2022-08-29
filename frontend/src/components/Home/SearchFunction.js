// import "./HomePage.css";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getAllSongs } from "../../store/songs";
// import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";

// export function SearchSongTitle({title}) {
//     //get all songs
//     const dispatch = useDispatch();
//     const UserSignedIn = useSelector((state) => state.session.user);
//     const user = useSelector((state) => state.session.user);

//     const songs = useSelector((state) => state.song);
//     const SongsArray = Object.values(songs);
//     //filter through songs to randomly select whats trending
//     let randomNumber;

//     let filtered;

//     //prevents counter from updating after every single render


//     //set state for

//   useEffect(() => {
//     dispatch(getAllSongs())
// }, [])



// filtered = SongsArray.filter((filteredSongs) => filteredSongs.title === title)

// //   console.log(filtered + 'filtered')
// //   console.log(randomNumber + 'randomNumber')


//     return (
//           <div className="songs-container">
//           {filtered &&
//           filtered.map((song) => {
//             return (
//                 <div className="songCard" key={song.id}>
//                   <div>Song id: {song.id}</div>
//                   <img className="songImage" src={song.imageUrl}></img>
//                   <div className="songDescription">
//                     Description: {song.description}
//                   </div>
//                   <div className="userId">User: {song.userId}</div>
//                   <div className="albumId">Album: {song.albumId}</div>

//                   <NavLink className="songLink" to={`/songs/${song.id}`}>
//                     {song.title}
//                   </NavLink>
//                 </div>
//             )
//           })
//         }
//           </div>
//     );
//   }
