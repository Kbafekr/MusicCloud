import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { HomePage } from "./components/Home/HomePage";
import { PageNotFound } from "./components/UnknownPage/PageNotFound";
import ReturnAllSongs from "./components/Songs";
import SongDetails from "./components/Songs/OneSong";
import { LibraryPage } from "./components/LibraryPage/LibraryPage";
import ReturnAllAlbums from "./components/Albums";
import CurrentSongs from "./components/LibraryPage/CurrentSongs";
import CurrentAlbums from "./components/LibraryPage/CurrentAlbums";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route exact path='/library'>
            <LibraryPage />
          </Route>

          <Route exact path='/songs'>
            <ReturnAllSongs />
          </Route>
          <Route exact path='/songs/current'>
            <CurrentSongs />
          </Route>
          <Route exact path='/songs/:songId'>
            <SongDetails />
          </Route>

          <Route exact path='/albums'>
            <ReturnAllAlbums />
          </Route>

          <Route exact path='/albums/current'>
            <CurrentAlbums />
          </Route>
          <Route exact path='/albums/:albumId'>
            <ReturnAllAlbums />
          </Route>

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
