import React, { useState, useEffect } from "react";
import RecommendedCard from "./Recommend-Card";
import "./Style-recommend-list.css";
import DetailsCard from './Details-Card'


function RecommendList(props) {
    const [recommended, setRecommended] = useState([{}]);
    const [showDetails, setShowDetails] = useState(false);
    const [movieDetails, setMovieDetails] = useState({});

    const requestOption = {
        method: 'GET',
        credentials: 'include'
    }

    useEffect(() => {
        handleRecommendCall()
    }, []);



    const handleRecoRequest = () => {
        handleRecommendCall()

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }


    const handleRecommendCall = async () => {

        try {
            const endpoint = window.location.hostname === 'localhost' ? 'https://tasty-tv-app.herokuapp.com/recommend'
                : '/recommend'
            await fetch(endpoint, requestOption).then(async (res) => {
                const response = await res.json()

                if (recommended.length >= 400) {
                    setRecommended([{}])
                    window.scrollTo({
                        bottom: document.body.scrollHeight,
                    });
                }

                response.forEach((movie) => {
                    setRecommended((prevMovies) => {

                        let displayTitle = movie.title.substring(0, 15)
                        if (movie.title.length > 15) { displayTitle = displayTitle + '...' }

                        return [
                            ...prevMovies,
                            {
                                id: movie.id,
                                title: movie.title,
                                displayTitle: displayTitle,
                                poster: movie.posterURL,
                                overview: movie.overview,
                                user_score: movie.user_score,
                                watched: false
                            }
                        ];

                    });
                });

            })
        }
        catch (err) {
            console.log('Error', err)
        }
    }

    const detailsCheck = (
        user,
        id,
        overview,
        user_score,
        title,
        poster,
        watched) => {

        setShowDetails(true)
        setMovieDetails({
        user: user,
        id: id,
        overview: overview,
        user_score: user_score,
        name: title,
        poster: poster,
        watched: watched
        })
    }

    const showDetailsCard = () =>{
        if (showDetails) {
            return (
                <div className='detailsCard'>
                    <DetailsCard
                        id={movieDetails.id}
                        poster={movieDetails.poster}
                        name={movieDetails.name}
                        user_score={movieDetails.user_score}
                        overview={movieDetails.overview}
                    />

                </div>
            )
        }
        else { return null }
    }


    return (
        <div className="recommended">

            <div className="content-container">
                <div className="recoList">
                {showDetailsCard()}
                    {recommended.map((mov, index) => {
                        return (
                            <RecommendedCard
                                key={index}
                                user={props.user}
                                id={mov.id}
                                title={mov.title}
                                displayTitle={mov.displayTitle}
                                poster={mov.poster}
                                onAdd={detailsCheck}
                                watched={mov.watched}
                                overview={mov.overview}
                                user_score={mov.user_score}
                            />
                        );
                    })}
                </div>
                <button className="apiCall" onClick={handleRecoRequest}>Spin</button>
            </div>

        </div>
    )


};

export default RecommendList;