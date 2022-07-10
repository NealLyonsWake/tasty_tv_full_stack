import React, { useEffect, useState } from "react";
import CommentCard from "./Comment-Card";

function ReviewCard(props) {
  const [commentList, setCommentList] = useState([])
  const [validateComment, setValidateComment] = useState('')

  useEffect(() => {
    retrieveComments()
  }, [])

  const title = props.title;
  const poster = props.poster;
  const review = props.review;

  const retrieveComments = async () => {
    const endpoint = "/comment/requestretrievecomments/"

    const requestOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
    };
    try {
      const res = await fetch(`${endpoint}${props._id}`, requestOptions)
      const response = await res.json()
      setCommentList(response)
      // alert(response.message)
      // handleLogin(response.loggedIn, response.user)
    }

    catch (e) {
      console.log(e, "Error connecting to server")
    }
  }




  function onEdit(e) {
    props.commentEdit(props._id, e.target.value);
  }

  const handleClickAddComment = async (e) => {

    e.preventDefault()

    if(props.comment.length){

    const endpoint = "/comment/requestcomment"

    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: props._id,
        comment: props.comment
      })
    };
    try {
      const res = await fetch(endpoint, requestOptions)
      const response = await res.json()
      setValidateComment('')
      alert(response.message)
      
    }

    catch (e) {
      console.log(e, "Error connecting to server")
    }

    retrieveComments()
  }
  else{
    setValidateComment('Empty')
  }
}

const handleCallDetails = async () => {

  props.callDetails(
      props.user,
      props.id,
      props.overview,
      props.user_score,
      props.title,
      props.poster,
      props.watched
  );
  }

  return (
    <div className="reviewCard">
      <div className="reviewHeading">
        <h3>{title}</h3>
        <h5>{`Review by ${props.author}`}</h5>
      </div>
      <div className="reviewPoster">
        <img className="poster" src={poster} onClick={handleCallDetails} alt={`Banner for the movie, ${title}`} />
      </div>
      <div className="reviewPost">
        <p>
          <i>{`"${review}"`}</i>
        </p>
      </div>
      <h4>Comments</h4>
      {commentList.map((comment, index) => {
        return (
          <div className="reviewsContainer">
            <CommentCard
              key={index}
              commentId={comment.commentId}
              user={comment.user}
              comment={comment.comment}
            />
          </div>
        );
      })}<p>{validateComment}</p>
      <form  onSubmit={handleClickAddComment}>
        <textarea className="comment-form" onChange={onEdit} name={props._id} value={props.comment} minLength='1' placeholder="Write a comment..."></textarea>
        <button className="commentButton" >Comment</button>
      </form>
    </div>
  );
}

export default ReviewCard;
