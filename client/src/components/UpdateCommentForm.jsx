import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'

const UpdateCommentForm = ({
  post_id,
  user,
  comment,
  commentId,

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
  const getComments = async () => {
    const res = await axios.get(
      `http://localhost:3001/comment/${post_id}/comments`
    )
    console.log(res)

    setComments(res.data)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.put(
      `http://localhost:3001/comment/${commentId}/update`,
      reviewState
    )
    setReviewState(initialState)
    setLoaded(true)
    setDisplayUpdate(false)
    getComments()
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
          value={comment.comment}
          placeholder="Comment here..."
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateCommentForm
