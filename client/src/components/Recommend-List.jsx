import React, { useState, useEffect } from "react";
import RecommendedCard from "./Recommend-Card";
import "./Style-recommend-list.css";


function RecommendList(props) {
    const [recommended, setRecommended] = useState([{}]);

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
            await fetch('https://tasty-tv-app.herokuapp.com/recommend', requestOption).then(async (res) => {
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
    return (
        <div className="recommended">
                    
            <div className="content-container">
                <div className="recoList">
                    {recommended.map((mov, index) => {
                        return (
                            <RecommendedCard
                                key={index}
                                user={props.user}
                                id={mov.id}
                                title={mov.title}
                                displayTitle={mov.displayTitle}
                                poster={mov.poster}
                                onAdd={props.addMov}
                                watched={mov.watched}
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