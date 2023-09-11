import { useState, useEffect, useParams } from 'react'
import axios from 'axios'
import Client from '../services/api'

const UpdateCommentForm = ({
  post_id,
  user,
  comment,
  commentId,
  getComments,
  setDisplayUpdate
}) => {
  const initialState = {
    userId: user.id,
    postId: post_id,
    comment: '',
    userName: user.userName
  }
  const [comments, setComments] = useState([])
  const [reviewState, setReviewState] = useState(initialState)
  const [loaded, setLoaded] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.put(
      `http://localhost:3001/comment/${commentId}/update`,
      reviewState
    )
    console.log('1')
    setReviewState(initialState)
    console.log('2')
    setLoaded(true)
    console.log('3')
    setDisplayUpdate(false)
    console.log('4')
    getComments()
    console.log('5')
  }
  console.log(comments)
  const handleChange = (e) => {
    setReviewState({ ...reviewState, [e.target.id]: e.target.value })
    console.log(reviewState)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="updateForm">
        <textarea
          id="comment"
          cols="40"
          rows="5"
          onChange={handleChange}
          value={reviewState.comment}
          placeholder="Comment here..."
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Confirm
        </button>
      </form>
    </div>
  )
}

export default UpdateCommentForm
