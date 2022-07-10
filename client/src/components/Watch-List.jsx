import "./Style-watch-list.css";
import React, { useState, useEffect } from "react";
import WatchCard from "./Watch-Card";
import handleWatchCall from '../calls/getWatchList'

function WatchList(props) {
  useEffect(() => {
    updateWatchList()
  }, [])

  const updateWatchList = async () => {
    const response = await handleWatchCall(props.loggedIn)
    props.updateWatchList(response)

  }

  // Initialize the watchlist prop variable
  const watchCards = props.toWatch;


  // Called when the user clicks on "remove watched" button.
  // Invokes the parent function to filter out any returned true watched values.
  const removeWatched = async () => {
    props.removeWatched();

    const endpoint = "/watch/requestremovewatched"

    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await fetch(`${endpoint}`, requestOptions)
      const response = await res.json()
      console.log(response, "Hey")
      // handleLogin(response.loggedIn, response.user)
    }

    catch (e) {
      console.log(e, "Error connecting to server")
    }
  }


  // Called when the user clicks on "remove all" button.
  // Invokes the parent function to reset the state of watchlist back to default.
  const removeAll = async () => {
    props.removeAll();

    const endpoint = "/watch/requestdeleteall"

    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await fetch(`${endpoint}`, requestOptions)
      const response = await res.json()
      console.log(response, "Hey")
      // handleLogin(response.loggedIn, response.user)
    }

    catch (e) {
      console.log(e, "Error connecting to server")
    }
  }

  function checkList() {
    if (watchCards.length < 1 && watchCards.poster === undefined && props.loggedIn) {

      return (
        <div>
          <h1 className="empty">It's empty!</h1>
          <p>Add some tasty randoms to your watch list.</p>
        </div>
      );
    }
    else if (!props.loggedIn) {
      return (
        <div>
          <h1 className="empty">Oops!</h1>
          <p>You need to be logged in to see your watch list.</p>
        </div>
      );
    } else {
      return (
        <div>
          <button className="removeButton" onClick={removeAll}>
            Remove All
          </button>
          <button className="removeButton" onClick={removeWatched}>
            Remove Watched
          </button>
        </div>
      );
    }
  }

  return (
    <div className="watchListContainer">
      {checkList()}
      <div className="cardContainer">
        {watchCards.map((mov, index) => {
          return (
            <WatchCard
              key={index}
              id={mov.id}
              title={mov.name}
              poster={mov.poster}
              watched={mov.watched}
              review={mov.review}
              posted={mov.posted}
              edit={props.edit}
              post={props.post}
              toggleWatched={props.toggleWatched}
              deleteSingleMov={props.deleteSingleMov}
              reviews={props.reviews}
              user_score={mov.user_score}
              overview={mov.overview}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;