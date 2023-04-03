import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'

const UpdateCommentForm = ({
  post_id,
  user,
  comment,
  commentId,
  setLoaded,
  setDisplayUpdate
}) => {
  const initialState = {
    userId: user.id,
    postId: post_id,
    comment: '',
    userName: user.userName
  }

  const [reviewState, setReviewState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3001/comment/${commentId}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewState)
        }
      )

      const updatedComment = await response.json()
      setReviewState(updatedComment)
      setLoaded(true)
      setDisplayUpdate(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setReviewState({ ...reviewState, [e.target.id]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="updateForm">
        <textarea
          id="comment"
          cols="20"
          rows="10"
          onChange={handleChange}
          value={reviewState.comment}
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
