import "./Style-reviews.css";
import React, { useEffect } from "react";
import ReviewCard from "./Review-Card";
import handleReviewCall from '../calls/getReviews'
import DetailsCard from "./Details-Card";

function Reviews(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    updateReviews()
  }, [])

  const updateReviews = async () => {
    const response = await handleReviewCall()
    props.updateReviews(response)
  }

  const cancel = () =>{
    setShowDetails(false)
    setMovieDetails({})
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

  const showDetailsCard = () => {
    if (showDetails) {
      return (
        <div className='detailsCard'>
          <DetailsCard
            user={movieDetails.user}
            id={movieDetails.id}
            poster={movieDetails.poster}
            title={movieDetails.name}
            user_score={movieDetails.user_score}
            overview={movieDetails.overview}
            watched={movieDetails.watched}
            cancel={cancel}

          />

        </div>
      )
    }
    else { return null }
  }

  const reviews = props.postedReviews;

  if (reviews.length < 1 && reviews.poster === undefined && props.loggedIn) {
    return (
      <div className="emptyReview">
        <h1 className="emptyTitle">There are no reviews!</h1>
        <p>Add a movie to your watch list and post a review.</p>
      </div>
    );
  }
  else if (!props.loggedIn) {
    return (
      <div className="emptyReview">
        <h1 className="emptyTitle">Oops!</h1>
        <p>You need to be logged in to see reviews.</p>
      </div>
    );
  }
  else {
    return <div>
      {showDetailsCard()}
      {reviews.map((post, index) => {
        return (
          <div className="reviewsContainer">
            <ReviewCard
              key={index}
              _id={post._id}
              author={post.author}
              title={post.name}
              poster={post.poster}
              review={post.review}
              comment={post.comment}
              commentEdit={props.commentEdit}
              callDetails={detailsCheck}
            />
          </div>
        );
      })}</div>;
  }
}

export default Reviews;
