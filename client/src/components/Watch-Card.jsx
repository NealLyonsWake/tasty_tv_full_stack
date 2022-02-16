import React, { useState } from "react";
import "./Style-watch-card.css";

function WatchCard(props) {
    // Initalize variables from props
    const id = props.id;
    const title = props.title;
    const poster = props.poster;
    const watched = props.watched;
    const review = props.review;
    const posted = props.posted;

    // Setup handle toggle function for watched movie if the movie has an entry.
    // Check or uncheck the watched checkbox depending on if watched is true or false.
    if (props.poster !== undefined) {
        const handleToggle = async () => {
            props.toggleWatched(id, watched);

            const endpoint = "https://tasty-tv-api.herokuapp.com/watch/requestcheckwatched/"

            const requestOptions = {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    watched: props.watched,
                })


            };

            try {
                const res = await fetch(`${endpoint}${props.id}`, requestOptions)
                const response = await res.json()
                console.log(response, "Hey")
                // handleLogin(response.loggedIn, response.user)
            }

            catch (e) {
                console.log(e, "Error connecting to server")
            }
        };


        // Delete a single movie when user clicks on the "delete" button.
        // Parent function invoked inside this function through props.
        const deleteSingleMov = async () => {
            props.deleteSingleMov(id);

            const endpoint = "https://tasty-tv-api.herokuapp.com/watch/requestdeletesingle/"

            const requestOptions = {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await fetch(`${endpoint}${props.id}`, requestOptions)
                const response = await res.json()
                console.log(response, "Hey")
                // handleLogin(response.loggedIn, response.user)
            }

            catch (e) {
                console.log(e, "Error connecting to server")
            }
        }


        // Invoked whenever the user types anything in the textarea element.
        // Invokes the parent function to update the state of the review value.
        function onEdit(e) {
            // setNote(e.target.value)
            props.edit(id, e.target.value);
        }

        // Invoked when the user clicks on the "post" / "edit" button.
        // Invokes the parent function to update the state of review posts.
        const onPost = async () => {
            props.post(id, review, posted, title, poster);

            if (review !== "") {

                const endpoint = "https://tasty-tv-api.herokuapp.com/review/requestreview"

                const requestOptions = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        author: props.user,
                        id: props.id,
                        name: props.title,
                        poster: props.poster,
                        watched: props.watched,
                        review: props.review,
                        posted: props.posted,
                        comment: ''
                    })
                };
                try {
                    const res = await fetch(endpoint, requestOptions)
                    const response = await res.json()
                    
                }

                catch (e) {
                    console.log(e, "Error connecting to server")
                }
            }
        }



        // Checks if the textarea should be enabled or disabled on loadup.
        // If a review has been posted for a particular movie the textarea would be disabled on load up.
        const handlePosted = () => {
            return posted;
        };

        // Checks if a movie review has already been reviewed and sets the button text to edit if so.
        const postedCheck = () => {
            if (posted) {
                return "Edit";
            } else {
                return "Post";
            }
        };

        return (
            <div className="watchCard">
                <div className="head">
                    <h2>{title}</h2>
                </div>
                <div className="banner">
                    <img src={poster} alt={`Banner for the movie, ${title}`} />
                </div>

                <div className="buttons">
                    <button className="watchButtons">Play</button>
                    <button className="watchButtons" onClick={deleteSingleMov}>
                        Delete
                    </button>
                    <label>
                        <input type="checkbox" checked={watched} onChange={handleToggle} />
                        Watched
                    </label>
                </div>
                <div className="review">
                    <label>
                        Your Movie Review
                        <textarea
                            onChange={onEdit}
                            value={review}
                            disabled={handlePosted()}
                        ></textarea>
                        <button className="editButton" onClick={onPost}>
                            {postedCheck()}
                        </button>
                    </label>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default WatchCard;
