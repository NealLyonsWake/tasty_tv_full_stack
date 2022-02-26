import React, { useState, useEffect } from 'react';
import Logo from '../img/logo.png'
import RecommendList from './Recommend-List';
import WatchList from './Watch-List';
import Reviews from './Reviews'
import AccountTop from './Account-Top';
import "./Style-top-screen.css";
import { Link } from "react-router-dom";
import { useLocation, Routes, Route } from "react-router-dom";
import checkLogin from '../calls/getCheckLogin';
import handleHeading from '../supportFunctions/handleHeading';


function TopScreen() {
    // Set up the top-level states for the front end application.
    const [watchList, setWatchList] = useState([])
    const [postedReviews, setPostedReviews] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState('')

    const location = useLocation()

    useEffect(() => {
        // Start routinely checking the user's login status to maintain appropriate user access.
        confirmLogin()
    }, [])

    const confirmLogin = async () => {
        const data = await checkLogin()
        if (data.loggedIn) {
            setLoggedIn(data.loggedIn)
            setUser(data.user)
        }
        else {
            setLoggedIn(false)
            setUser(data.user)
            setWatchList(data.watchList)
        }
        setTimeout(() => {
            confirmLogin()
        }, 1000)
        // console.log(data)
    }


    const updateWatchList = (list) => {
        setWatchList(list)
    }

    const updateReviews = (reviews) => {
        console.log(reviews)
        setPostedReviews(reviews)
    }

    const commentEdit = (_id, e) => {
        const editComment = postedReviews.map((review) => {
            if (review._id === _id) {
                review.comment = e;
            }
            return review;
        });
        setPostedReviews(editComment);
    }

    function handleLogin(loggedIn, user) {
        setLoggedIn(loggedIn)
        setUser(user)
    }

    // Managing watch list movies (toggle watched)
    const handleWatched = (movId, watched) => {
        const watchedMovies = watchList.map((m) => {
            if (m.id === movId) {
                m.watched = !watched;
            }
            return m;
        });

        setWatchList(watchedMovies);
    };

    // Managing watch list movies (delete all watched movies)
    const removeWatched = () => {
        if (watchList.length === 0) {
            alert("No movies to remove!");
            return;
        }

        setWatchList(watchList.filter((m) => m.watched === false));
    };

    // Managing watch list movies (delete a single movie)
    function deleteSingleMov(id) {
        setWatchList((prev) => {
            return prev.filter((index) => {
                return index.id !== id;
            });
        });



    }

    // Managing watch list movies (delete all movies)
    function removeAll() {
        setWatchList([]);
    }

    // Update the state of the review comment box in the watch list while the user is typing
    const handleEdit = (movId, movReview) => {
        const editedMovies = watchList.map((m) => {
            if (m.id === movId) {
                m.review = movReview;
            }
            return m;
        });

        setWatchList(editedMovies);
    };

    // Update the state of the posted boolean to post the user's review or allow the user to edit their comments on their watch list.
    const handlePost = (movId, movReview, movPosted, movTitle, movBanner) => {
        if (movReview === "") {
            return alert("Oops, there is no review to post! Write a review.");
        }
        if (!movPosted) {
            alert("Nice One! Your review was posted!");
            // Call the onPost function if there is actually a review to post
            onPost(movId, movTitle, movBanner, movReview);
        }
        const postedMovies = watchList.map((m) => {
            if (m.id === movId) {
                m.posted = !movPosted;
            }
            return m;
        });

        setWatchList(postedMovies);
    };

    // Function to update the state of posted reviews to the reviews component
    function onPost(movId, movTitle, movBanner, movReview) {

        // Check if movie has already been posted by the user. Use movId and then userID for future handling
        const checkPosted = postedReviews.find((movie) => {
            return movie.id === movId
            // add userID when user accounts stuf setup
        })

        if (!checkPosted) {
            // post new entry if user has not already posted
            // userId needs adding once setup
            setPostedReviews((prevPost) => {
                return [
                    ...prevPost,
                    {
                        id: movId,
                        name: movTitle,
                        banner: movBanner,
                        review: movReview
                    }
                ];
            });
        }
        else {
            // edit the existing post made by the user
            // userId needs adding once setup
            const updateReviews = postedReviews.map((review) => {
                if (review.id === movId) {
                    review.review = movReview
                }
                return review
            })
            setPostedReviews(updateReviews)

        }

    }

    


    return (
        <div>
            <header>
                <div>
                    <img className="logo" src={Logo} alt="Tasty TV logo" />
                </div>
                <nav>
                    <Link to="/tastyrandoms">
                        <button className="navButton" value="Tasty Randoms" >Randoms</button>
                    </Link>
                    <Link to="/watchlist">
                        <button className="navButton" value="Watch List" >Watch List</button>
                    </Link>
                    <Link to="/reviews">
                        <button className="navButton" value="Reviews" >Reviews</button>
                    </Link>
                    <Link to="/account">
                        <button className="navButton" value="Account" >Account</button>
                    </Link>
                </nav>

                {handleHeading(location, user)}
            </header>
            {/* {returnComponent()} */}
            <Routes>
                <Route
                    path="/"
                    element={<RecommendList user={user} />}
                />
                <Route
                    path="/tastyrandoms"
                    element={<RecommendList user={user} />}
                />
                <Route
                    path="/watchlist"
                    element={
                        <WatchList
                            toWatch={watchList}
                            toggleWatched={handleWatched}
                            removeWatched={removeWatched}
                            edit={handleEdit}
                            post={handlePost}
                            deleteSingleMov={deleteSingleMov}
                            removeAll={removeAll}
                            reviews={postedReviews}
                            loggedIn={loggedIn}
                            user={user}
                            updateWatchList={updateWatchList}
                        />
                    }

                />
                <Route
                    path="/reviews"
                    element={<Reviews postedReviews={postedReviews} loggedIn={loggedIn} user={user} commentEdit={commentEdit} updateReviews={updateReviews} />}

                />
                <Route
                    path="/account"
                    element={<AccountTop
                        handleLogin={handleLogin}
                        loggedIn={loggedIn} user={user} />}

                />
            </Routes>
        </div>
    );
}

export default TopScreen;