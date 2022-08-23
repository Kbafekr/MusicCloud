import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { HomePage } from "./components/Home/HomePage";
import { PageNotFound } from "./components/UnknownPage/PageNotFound";
import ReturnAllSongs from "./components/Songs";

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
          <Route path='/songs'>
            <ReturnAllSongs />
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
